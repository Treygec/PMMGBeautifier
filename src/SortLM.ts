import { Style } from "./Style";
import { genericCleanup } from "./util";

export class SortLM {
  private tag = "sort-by-type";
  private headingTypes = ["buying", "selling", "shipping"];
  private cleanups: Array<() => void> = [];

  cleanup() {
    this.cleanups.forEach((f, i) => {
      f();
      delete this.cleanups[i];
    });
    genericCleanup(this.tag);
  }
  run() {
    this.addMainSortingButtons();
  }

  private sortAds(event: any): any {
    console.log("made it into sorting");
    let shippingAds: Element[] = [];
    let buyingAds: Element[] = [];
    let sellingAds: Element[] = [];
    console.log(event.srcElement.parentElement.parentElement.parentElement);
    const adSection = event.srcElement.parentElement.parentElement.parentElement.querySelector(
      "div[class^='LocalMarket__list___'"
    );
    let ads = (adSection.querySelectorAll(
      "div[class^='CommodityAd__container'"
    ) as any) as Array<HTMLElement>;

    ads.forEach((ad) => {
      switch (
        (ad.querySelector(
          "div[class^='CommodityAd__text___1WaFTEY'"
        ) as any).innerText.split(" ", 1)[0]
      ) {
        case "BUYING":
          buyingAds.push(ad);
          break;
        case "SELLING":
          sellingAds.push(ad);
          break;
        case "SHIPPING":
          shippingAds.push(ad);
          break;
      }
    });

    switch (event.srcElement.innerText) {
      case "buying":
        shippingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        sellingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        buyingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "inline";
        });
        break;
      case "selling":
        shippingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        buyingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        sellingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "inline";
        });
        break;
      case "shipping":
        buyingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        sellingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "none";
        });
        shippingAds.forEach((ad: HTMLElement) => {
          ad.style.display = "inline";
        });
        break;
    }
    // ad.style.display = "none"
  }

  private addMainSortingButtons() {
    let headingSections = Array.from(
      document.querySelectorAll(
        "div[class^='SectionHeader__container___O8miwZz fonts__font-regular___w47oqm8'"
      )
    );

    headingSections.forEach((heading) => {
      this.createMainSortingButtons().forEach((button) => {
        heading.appendChild(button);
      });
    });
  }
  private createMainSortingButtons() {
    let buttons: HTMLElement[] = [];
    this.headingTypes.forEach((heading) => {
      let button = document.createElement("button");
      button.classList.add(Style.LocalMarketSortControlsHeading);
      button.classList.add(this.tag);
      let title = document.createElement("div");
      title.textContent = heading;
      button.appendChild(title);
      button.addEventListener("click", () => this.sortAds(event));
      buttons.push(button);
    });
    return buttons;
  }
}
