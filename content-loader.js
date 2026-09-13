(async function () {
  try {
    const res = await fetch('/content/site.json', { cache: 'no-store' });
    if (!res.ok) return;
    const d = await res.json();
    const q = s => document.querySelector(s);
    const qa = s => [...document.querySelectorAll(s)];
    const html = (el, value) => { if (el && value != null) el.innerHTML = value; };
    const text = (el, value) => { if (el && value != null) el.textContent = value; };
    const br = s => String(s || '').replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');

    text(q('.logo-text b'), d.brand?.name);
    text(q('.logo-text small'), d.brand?.subtitle);
    text(q('.hero .cap'), d.hero?.kicker);
    html(q('.hero h1'), `${d.hero?.title1 || ''}<br><em>${d.hero?.title2 || ''}</em>`);
    text(q('.hero-copy'), d.hero?.copy);
    if (q('.hero .cta')) q('.hero .cta').childNodes[0].nodeValue = (d.hero?.cta || '') + ' ';

    text(q('.context .cap'), d.context?.label);
    text(q('.context h2'), d.context?.title);
    html(q('.context .split-context > div > p'), br(d.context?.body));

    text(q('.experience .cap'), d.experience?.label);
    text(q('.experience h2'), d.experience?.title);
    text(q('.exp-lead'), d.experience?.lead);
    const stats = qa('.stats > div');
    if (stats[0]) { text(stats[0].querySelector('b'), d.experience?.stat1Value); text(stats[0].querySelector('small'), d.experience?.stat1Label); }
    if (stats[1]) { text(stats[1].querySelector('b'), d.experience?.stat2Value); text(stats[1].querySelector('small'), d.experience?.stat2Label); }
    if (stats[2]) { text(stats[2].querySelector('b'), d.experience?.stat3Value); text(stats[2].querySelector('small'), d.experience?.stat3Label); }
    text(q('.experience .body'), d.experience?.body);

    text(q('.services .cap'), d.services?.label);
    text(q('.services-head h2'), d.services?.title);
    text(q('.services-head > p'), d.services?.intro);
    qa('.service-row').forEach((row, i) => {
      const item = d.services?.items?.[i]; if (!item) return;
      text(row.querySelector('h3'), item.title); text(row.querySelector('p'), item.body);
    });

    text(q('.spaces-head h2'), d.spaces?.title);
    text(q('.spaces-head p'), d.spaces?.note);
    const caps = qa('.spaces .caption-block');
    const mapSpaces = [
      [d.spaces?.item2Title, d.spaces?.item2Body],
      [d.spaces?.item1Title, d.spaces?.item1Body],
      [d.spaces?.item3Title, d.spaces?.item3Body]
    ];
    caps.forEach((c, i) => { if (!mapSpaces[i]) return; text(c.querySelector('h3'), mapSpaces[i][0]); text(c.querySelector('p'), mapSpaces[i][1]); });

    text(q('.sp-panel .cap'), d.saopaulo?.label);
    text(q('.sp-panel h2'), d.saopaulo?.title);
    text(q('.sp-panel .sp-grid > div:last-child > p:last-child'), d.saopaulo?.body);

    text(q('.principles .cap'), d.principles?.label);
    text(q('.principles h2'), d.principles?.title);
    qa('.principle-list > div').forEach((row, i) => {
      const item = d.principles?.items?.[i]; if (!item) return;
      text(row.querySelector('h3'), item.title); text(row.querySelector('p'), item.body);
    });

    text(q('.final-kicker'), d.closing?.kicker);
    html(q('.final-panel h2'), `${d.closing?.line1 || ''}<br>${d.closing?.line2 || ''}<br><em>${d.closing?.line3 || ''}</em>`);
    text(q('.final-sub'), d.closing?.sub);
    document.title = `${d.brand?.name || 'AUREON'} ${d.brand?.subtitle || ''}`.trim();
  } catch (e) {
    console.warn('Content config not loaded:', e);
  }
})();
