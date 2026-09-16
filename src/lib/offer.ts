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
