/**
 * TÉRCIO MENDES - CORRETOR DE IMÓVEIS (CRECI-MG 52598)
 * Especialista em Vendas de Loteamentos & Terrenos
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initWizardForm();
  initPropertyFilters();
  updateSimulador();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   2. MULTI-STEP LEAD QUALIFICATION WIZARD
   ========================================================================== */
let currentStep = 1;

function nextStep(step) {
  if (step < 1 || step > 4) return;

  const currentSlide = document.querySelector(`.wizard-slide[data-slide="${currentStep}"]`);
  if (currentSlide) currentSlide.classList.remove('active');

  currentStep = step;
  const targetSlide = document.querySelector(`.wizard-slide[data-slide="${currentStep}"]`);
  if (targetSlide) targetSlide.classList.add('active');

  // Update progress bar
  const progressBar = document.getElementById('progressBar');
  const percentage = (currentStep / 4) * 100;
  if (progressBar) progressBar.style.width = `${percentage}%`;

  // Update step indicators
  document.querySelectorAll('.progress-step').forEach(el => {
    const stepNum = parseInt(el.getAttribute('data-step'), 10);
    if (stepNum <= currentStep) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

function prevStep(step) {
  nextStep(step);
}

function initWizardForm() {
  const wizardForm = document.getElementById('leadWizardForm');

  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const intencao = wizardForm.querySelector('input[name="intencao"]:checked')?.value || 'Não informado';
      const orcamento = wizardForm.querySelector('input[name="orcamento"]:checked')?.value || 'Não informado';
      const tipo = wizardForm.querySelector('input[name="tipo"]:checked')?.value || 'Não informado';
      const nome = document.getElementById('leadNome')?.value || 'Cliente';
      const whatsapp = document.getElementById('leadWhatsapp')?.value || '';
      const obs = document.getElementById('leadObs')?.value || 'Nenhuma';

      // Format WhatsApp Message Payload
      const messageText = 
`🗺️ *NOVO DIAGNÓSTICO DE LOTEAMENTO - SITE TÉRCIO MENDES*

👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
🎯 *Objetivo:* ${intencao}
💰 *Orçamento:* ${orcamento}
🏞️ *Tipo de Lote:* ${tipo}
📍 *Região / Obs:* ${obs}

_Enviado via Diagnóstico do Site Tércio Mendes (CRECI-MG 52598)_`;

      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/5538999766187?text=${encodedMessage}`;

      // Open WhatsApp directly
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* ==========================================================================
   3. PROPERTY SHOWCASE FILTERS
   ========================================================================== */
function initPropertyFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      propertyCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'todos' || filter === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE SIMULATOR FOR REAL ESTATE INVESTMENT
   ========================================================================== */
function updateSimulador() {
  const valorInput = document.getElementById('simValor');
  const entradaInput = document.getElementById('simEntrada');

  if (!valorInput || !entradaInput) return;

  const valor = parseFloat(valorInput.value);
  const percentEntrada = parseFloat(entradaInput.value);

  const valorEntrada = valor * (percentEntrada / 100);
  const saldoFinanciar = valor - valorEntrada;

  // Format currency helper
  const fmt = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

  const simValorVal = document.getElementById('simValorVal');
  const simEntradaVal = document.getElementById('simEntradaVal');
  const resEntrada = document.getElementById('resEntrada');
  const resSaldo = document.getElementById('resSaldo');

  if (simValorVal) simValorVal.innerText = fmt(valor);
  if (simEntradaVal) simEntradaVal.innerText = `${percentEntrada}%`;
  if (resEntrada) resEntrada.innerText = fmt(valorEntrada);
  if (resSaldo) resSaldo.innerText = fmt(saldoFinanciar);

  // Update WhatsApp link in simulator
  const simWhatsappBtn = document.getElementById('simWhatsappBtn');
  if (simWhatsappBtn) {
    const text = `Ol%C3%A1%2C%20T%C3%A9rcio!%20Fiz%20uma%20simula%C3%A7%C3%A3o%20de%20lote%20no%20seu%20site%3A%0A-%20Valor%20do%20Lote%3A%20${encodeURIComponent(fmt(valor))}%0A-%20Entrada%20(${percentEntrada}%25)%3A%20${encodeURIComponent(fmt(valorEntrada))}%0A-%20Saldo%20a%20Parcelar%3A%20${encodeURIComponent(fmt(saldoFinanciar))}.%0AGostaria%20de%20uma%20an%C3%A1lise%20oficial.`;
    simWhatsappBtn.href = `https://wa.me/5538999766187?text=${text}`;
  }
}

