/* AscendedOps — Chat widget */

(() => {
  const WEBHOOK_URL = 'PASTE_YOUR_N8N_WEBHOOK_URL_HERE';
  const OPENING_MSG = "Got a question about how AscendedOps works? Ask away — I'll give you a straight answer.";

  const widget   = document.getElementById('chat-widget');
  const bubble   = document.getElementById('chat-bubble');
  const panel    = document.getElementById('chat-panel');
  const messages = document.getElementById('chat-messages');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');

  if (!widget || !bubble || !panel || !messages || !input || !sendBtn) return;

  let history    = [];
  let isLoading  = false;
  let firstOpen  = true;

  /* ── Open / close ── */

  function open() {
    panel.hidden = false;
    widget.classList.add('is-open');
    bubble.setAttribute('aria-expanded', 'true');
    if (firstOpen) {
      firstOpen = false;
      appendBotMsg(OPENING_MSG);
    }
    requestAnimationFrame(() => input.focus());
  }

  function close() {
    widget.classList.remove('is-open');
    bubble.setAttribute('aria-expanded', 'false');
    // Wait for exit transition before hiding from AT
    setTimeout(() => { panel.hidden = true; }, 220);
    bubble.focus();
  }

  bubble.addEventListener('click', () => {
    widget.classList.contains('is-open') ? close() : open();
  });

  panel.querySelector('.chat-panel__close').addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) close();
  });

  /* ── Send ── */

  function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    appendUserMsg(text);
    history.push({ role: 'user', content: text });
    input.value = '';
    resetInputHeight();
    setLoading(true);

    const outgoingHistory = history.slice(0, -1);

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: outgoingHistory }),
    })
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((data) => {
        const reply = data.reply || data.text || data.message || '';
        if (!reply) throw new Error('Empty reply');
        appendBotMsg(reply);
        history.push({ role: 'assistant', content: reply });
      })
      .catch(() => {
        appendBotMsg('Something went wrong on our end. Email hello@ascendedops.com directly and we\'ll get back to you within one business day.');
      })
      .finally(() => setLoading(false));
  }

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  /* ── DOM helpers ── */

  function appendUserMsg(text) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--user';
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function appendBotMsg(text) {
    removeTyping();
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot';
    el.textContent = text;
    messages.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    removeTyping();
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.id = 'chat-typing-indicator';
    el.setAttribute('aria-label', 'Typing');
    el.innerHTML = '<span class="chat-typing__dot"></span><span class="chat-typing__dot"></span><span class="chat-typing__dot"></span>';
    messages.appendChild(el);
    scrollToBottom();
  }

  function removeTyping() {
    const existing = document.getElementById('chat-typing-indicator');
    if (existing) existing.remove();
  }

  function setLoading(val) {
    isLoading = val;
    sendBtn.disabled = val;
    input.disabled = val;
    if (val) showTyping();
    else removeTyping();
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  /* ── Auto-resize textarea ── */

  function resetInputHeight() {
    input.style.height = 'auto';
  }

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    const maxH = 3 * 1.5 * 14 + 16;
    input.style.height = Math.min(input.scrollHeight, maxH) + 'px';
  });
})();
