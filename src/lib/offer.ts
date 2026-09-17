import { CHECKOUT_OPEN } from "./billing.ts";
import type { Copy, OfferTerms } from "../content/types.ts";

/**
 * One price promise, resolved in one place.
 *
 * The site used to say "Start 14 days free" on every button while the pricing
 * card said "Free while registration completes" two inches away. Both were
 * describing the same product in different tenses: the trial is what happens
 * once Polar can take a card, and CHECKOUT_OPEN is the switch that decides
 * whether that day has arrived.
 *
 * Every acquisition surface reads from here, so the two states can never be on
 * screen at the same time.
 */
export function pickOffer(offer: Copy["offer"], checkoutOpen: boolean): OfferTerms {
  return checkoutOpen ? offer.trial : offer.free;
}

export function offerTerms(copy: Copy): OfferTerms {
  return pickOffer(copy.offer, CHECKOUT_OPEN);
}

/**
 * The terms of service, price-dependent paragraphs first.
 *
 * The terms went on promising "14 days free, then €19/month" for months after
 * the checkout closed, because the price lived in the page's own copy rather
 * than on the offer. A wrong price on the terms page is worse than a wrong
 * price on the homepage: it is the page a careful stranger opens precisely
 * because they want the real number.
 */
export function termsBody(copy: Copy): string[] {
  return [...offerTerms(copy).legal, ...copy.termsPage.body];
}

/** The privacy policy, with the Payments paragraph resolved from the offer. */
export function privacyBody(copy: Copy): string[] {
  return [
    ...copy.privacyPage.bodyBefore,
    offerTerms(copy).privacyPayments,
    ...copy.privacyPage.bodyAfter,
  ];
}
