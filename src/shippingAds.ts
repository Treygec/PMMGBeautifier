import { toFixed } from "./util";

export class ShippingAds {
  constructor() {

  }

  cleanup() {}
  run() {
    const elements = document.querySelectorAll("div[class^='CommodityAd__text___'");

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const text = element.textContent;
      const matches = text.match(/(?:SHIPPING)\s([\d.]+)t\s\/\s([\d.]+)m³\s@\s([\d,.]+)\s[A-Z]+\sfrom/);

      if (matches && matches.length > 3) {
        const totalCost = matches[3];
        const tonnage = matches[1];
        const size = matches[2];
        var unit;
        var count;
        if(tonnage > size){
          unit = 't';
          count = tonnage;
        } else {
          unit = 'm³';
          count = size;
        }


        const totalCents = parseInt(totalCost.replace(/[,.]/g, ''));
        const perItem = toFixed(totalCents / count / 100, 2);
        const priceSpan = element.children[0].children[2];

        this.appendToPrice(priceSpan, ` (${perItem*400} per 400${unit})`);
      }
    }
  }

  private appendToPrice(priceSpan: Element, text: string) {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add("prun-remove-js");
    priceSpan.append(span);
  }
}
