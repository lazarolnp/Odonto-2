/**
 * Paula Viana Odontologia — interações do site.
 * Vanilla JS, sem dependências. Carregado com `defer`.
 */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '5565996218598';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Header */
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('menu-principal');

  function onScroll() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
    toggleFloat();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------- Menu responsivo */
  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.classList.remove('is-locked');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
      document.body.classList.toggle('is-locked', open);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  /* --------------------------------------------- Animações de entrada leves */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------ Link ativo na navegação */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav ul a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* --------------------------------------------- Botão flutuante WhatsApp */
  var floatBtn = document.querySelector('[data-wa-float]');
  function toggleFloat() {
    if (!floatBtn) return;
    floatBtn.classList.toggle('is-visible', window.scrollY > 520);
  }

  /* --------------------------------------------------- Máscara de telefone */
  var phoneInput = document.querySelector('[data-phone-mask]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
      var out = digits;
      if (digits.length > 2) {
        out = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      }
      if (digits.length > 6) {
        var split = digits.length > 10 ? 7 : 6;
        out = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, split) + '-' + digits.slice(split);
      }
      phoneInput.value = out;
    });
  }

  /* ------------------------------------------------ Formulário de contato */
  var form = document.querySelector('[data-whatsapp-form]');

  if (form) {
    var status = form.querySelector('[data-form-status]');
    var defaultNote = status ? status.textContent.trim() : '';

    function setFieldError(input, hasError) {
      var field = input.closest('.field');
      var message = form.querySelector('[data-error-for="' + input.id + '"]');
      if (field) field.classList.toggle('has-error', hasError);
      if (message) message.hidden = !hasError;
      input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    }

    function validate() {
      var invalid = [];

      var nome = form.querySelector('#nome');
      setFieldError(nome, nome.value.trim().length < 2);
      if (nome.value.trim().length < 2) invalid.push(nome);

      var telefone = form.querySelector('#telefone');
      var digits = telefone.value.replace(/\D/g, '');
      var badPhone = digits.length < 10 || digits.length > 11;
      setFieldError(telefone, badPhone);
      if (badPhone) invalid.push(telefone);

      var email = form.querySelector('#email');
      var badEmail = email.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
      setFieldError(email, badEmail);
      if (badEmail) invalid.push(email);

      var consent = form.querySelector('#consentimento');
      setFieldError(consent, !consent.checked);
      if (!consent.checked) invalid.push(consent);

      return invalid;
    }

    // Limpa o erro assim que o visitante corrige o campo.
    form.addEventListener('input', function (event) {
      var target = event.target;
      if (!target.id || !target.closest('.field.has-error')) return;
      setFieldError(target, false);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var invalid = validate();

      if (invalid.length) {
        if (status) {
          status.textContent = 'Confira os campos destacados para continuar.';
          status.classList.remove('is-success');
          status.classList.add('is-error');
        }
        invalid[0].focus();
        return;
      }

      var data = new FormData(form);
      var lines = [
        'Olá, Dra. Paula! Vim pelo site e gostaria de agendar uma consulta.',
        '',
        'Nome: ' + String(data.get('nome')).trim(),
        'WhatsApp: ' + String(data.get('telefone')).trim()
      ];

      var email = String(data.get('email') || '').trim();
      if (email) lines.push('E-mail: ' + email);

      lines.push('Serviço: ' + data.get('servico'));
      lines.push('Melhor período: ' + data.get('periodo'));

      var mensagem = String(data.get('mensagem') || '').trim();
      if (mensagem) lines.push('', 'Sobre o caso: ' + mensagem);

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');

      if (status) {
        status.textContent = 'Pronto! Abrimos o WhatsApp com a sua mensagem — é só tocar em enviar.';
        status.classList.remove('is-error');
        status.classList.add('is-success');
      }

      form.reset();

      window.setTimeout(function () {
        if (!status) return;
        status.textContent = defaultNote;
        status.classList.remove('is-success');
      }, 9000);
    });
  }

  /* ------------------------------------------------------------ Rodapé */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
