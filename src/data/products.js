export const SHOPEE_URL = "https://shopee.co.id/thesaviera";
export const INSTAGRAM_URL = "https://www.instagram.com/saviera.co/";
export const FACEBOOK_URL = "https://www.facebook.com/saviera.co";
export const PINTEREST_URL = "https://pin.it/2p8Gsks";
export const HEALR_INSTAGRAM_URL = "https://www.instagram.com/healr.care/";

export function orderLink(product) {
  const text = `Hi Saviera.co I would like to place an order for ${product}.\nCan you assist me?`;
  return `https://wa.me/628175199968?text=${encodeURIComponent(text)}`;
}

const hd = (path) => ({ path, hd: true });

const careCotton = [
  "Cold Hand Wash",
  "Do not bleach, do not soak, do not use rinse agent, do not tumble dry, and do not dry clean",
  "Use mild detergent",
  "Separate from other colors",
  "Turn the clothing inside out during washing",
  "Air dry, lay flat on a drying rack",
  "Turn the garment inside out before ironing with a press cloth between the iron and fabric to prevent direct heat, use a medium-hot iron",
  "Store: Fold in cool, dry, and dark spaces",
];

export const products = [
  {
    slug: "omnia",
    path: "/01-omnia",
    name: "Omnia",
    title: "OMNIA",
    archetype: "For the day that wants two things.",
    fabric: "Pure cotton, deadstock",
    fit: [["Bust", "up to 115 cm"], ["Length", "101 cm, midi"], ["Under bust", "elastic, to 120 cm"]],
    weekday: "Open, as an outer over a plain top and trousers.",
    weekend: "Closed, as a summer dress with a slip underneath.",
    bustMax: 115,
    fitWithin: "Fits, open or closed.",
    fitOver: "Wear it open, as an outer.",
    worn: [["worn/9", "C3On39HPdvC"], ["worn/10", "DAgNhqozyj8"]],
    makerName: "Pak Taswan",
    makerPhoto: { src: "makers/taswan", alt: "Pak Taswan at his sewing machine" },
    summary:
      "A loungewear, casual outer, or a sexy summer dress with plunge deep V-neck with above-the-waist concealed elastic to give shape.",
    colors: [{ name: "Off-white", hex: "#F3EEE4", photos: [hd("omnia/off-white-1"), hd("omnia/off-white-2"), "omnia/off-white-3", "omnia/off-white-4", "omnia/off-white-5", "omnia/off-white-7"] }],
    size: [
      "All size, Standard Fit",
      "Midi length 101 cm",
      "Bust up to 115 cm",
      "Hollow to V-neck cut 23 cm",
      "Under bust rubber can stretch up to 120 cm",
      "Sleeve length 33 cm",
      "Sleeve width up to 60 cm (asymmetrical cut that allows breathable and flexible movement+size)",
    ],
    details: [
      "100% pure cotton (repurposed from deadstock fabrics)",
      "Textured (subtle checkered pattern)",
      "Fabric is cool, soft, and flowy",
      "Sheer, see-through",
      "No zip, rubber under bust",
      "Two functional side pockets",
    ],
    care: careCotton,
    maker:
      "Meet Pak Taswan. Nearly seven years of cutting, making, and trimming, across numerous designs and hundreds of fashion houses. His note on this cloth was simple: the fabric was easy to work, and the finish had to stay delicate.",
    story:
      "Omnia is Italian for all, or everything. Some days ask for pleasure, some for a straighter face. This piece treats them as one wardrobe, not two. Wear it open over nothing much, or closed when the day needs a shape.",
  },
  {
    slug: "wei-yi",
    path: "/01-wei-yi",
    name: "Wei Yi",
    title: "WEI YI",
    archetype: "For when you already know what you want.",
    fabric: "Pure linen",
    fit: [["Bust", "up to 114 cm buttoned, free open"], ["Length", "60.5 cm"], ["Sleeve", "25.5 cm"]],
    weekday: "Buttoned, over a white tee, into the meeting.",
    weekend: "Open, over a slip dress or a tank.",
    bustMax: 114,
    fitWithin: "Fits buttoned.",
    fitOver: "Fits worn open.",
    worn: [["worn/6", "C6nJXI6PZ3S"]],
    makerName: "Pak Darto",
    makerPhoto: { src: "makers/darto", alt: "Pak Darto in the workshop" },
    summary:
      "A relaxed, elegant, and fitting double-breasted blazer in asymmetrical cutting. Buttons inside, aiming for a sculptural look. This piece comes in three color selections: Mauve, Taupe, and Brown.",
    colors: [
      { name: "Mauve", hex: "#D9C9BF", photos: [hd("wei-yi/mauve-1"), hd("wei-yi/mauve-2"), hd("wei-yi/mauve-3"), "wei-yi/mauve-4"] },
      { name: "Taupe", hex: "#B7AA98", photos: ["wei-yi/taupe-1"] },
      { name: "Brown", hex: "#8A5530", photos: [hd("wei-yi/brown-1"), hd("wei-yi/brown-2"), hd("wei-yi/brown-3"), hd("wei-yi/brown-4")] },
    ],
    size: [
      "All size, Loose-Fit",
      "Bust up to 114 cm (buttoned), free size if unbuttoned",
      "Length 60,5 cm",
      "Sleeve length 25,5 cm",
      "Sleeve width 38 cm",
    ],
    details: [
      "100% pure linen, woven",
      "Fabric is soft, cool, flexible, structured",
      "Double-breasted",
      "Button made of premium acrylic, two functional inside, and two outside",
    ],
    care: [
      "Lukewarm or cold water",
      "Do not bleach, do not tumble dry, do not dry clean",
      "Use mild detergent",
      "Separate from other colors",
      "Air dry in a padded hanger or lay flat on a drying rack",
      "Turn the garment inside out before ironing with a press cloth between the iron and fabric to prevent direct heat, damp a bit before ironing on the highest heat",
      "Store: Hang or roll",
    ],
    maker:
      "Meet Pak Darto. Fifteen years of cutting, making, and trimming, and a speedy hand that still refuses a sloppy edge. The blazer’s interior buttons are his kind of problem: hidden, exact, and meant to be felt before they are seen.",
    story:
      "From first light to the late hours, we are taught to finish the list. Wei Yi is for the moment you already know what you want. Asymmetrical, double-breasted, and calm enough to wear until the linen remembers your shoulder.",
  },
  {
    slug: "cyanne",
    path: "/01-cyanne",
    name: "Cyanne",
    title: "CYANNE",
    archetype: "For calm, with a little heat.",
    fabric: "Organic cotton, crinkle and slub",
    fit: [["Bust", "120 cm tied, free loose"], ["Length", "77.5 cm"], ["Sleeve", "65.5 cm"]],
    weekday: "Tied close and tucked into tailored trousers.",
    weekend: "Left loose over a tank, belt hanging.",
    bustMax: 120,
    fitWithin: "Fits with the belt tied.",
    fitOver: "Fits worn loose, belt hanging.",
    worn: [["worn/8", "C3Ux-IEPKes"], ["worn/7", "DOXHT1REuG8"]],
    makerName: "Pak Tata",
    makerPhoto: { src: "makers/cutting", alt: "Cotton being cut by hand on the workshop table" },
    summary:
      "Wrap top that lasts beyond the season. Belt included (sewed in the back). Tailored details and material make this item a top-notch statement piece to wear. Tailored by artisans with a unique material hand.",
    colors: [
      { name: "Charcoal", hex: "#2E2E30", photos: [hd("cyanne/charcoal-1"), hd("cyanne/charcoal-2"), hd("cyanne/charcoal-3"), "cyanne/charcoal-4"] },
      { name: "Porcelain", hex: "#EFEDE8", photos: [hd("cyanne/porcelain-1"), hd("cyanne/porcelain-2"), hd("cyanne/porcelain-3"), "cyanne/porcelain-4"] },
    ],
    size: [
      "All sizes, Loose-Fit to Semi-Oversized",
      "Length 77,5 cm",
      "Bust 120 cm if the belt is tied, Free size if worn loose",
      "Sleeve length 65,5 cm",
      "Sleeve width 44 cm, asymmetrical cut in hem with width 35 cm",
      "Belt length 90 cm",
    ],
    details: [
      "100% Organic cotton",
      "Textured look with a mix of crinkle, slub, and crepe",
      "Fabric is soft, cool, and flowy",
      "Fixed belt, sewed on the back",
      "Two functional front pockets",
    ],
    care: careCotton,
    maker:
      "Meet Pak Tata. He was away when this note was written. We will share more of his hand, and the studio, on Instagram.",
    story:
      "Between calm and heat, order and a little chaos. Cyanne is the wrap that can be tied close or left to fall. An outside cut with an inside logic. Not a focal point to chase — a piece to add to the day you already have.",
  },
];

export function fitFor(product, bust) {
  return bust <= product.bustMax ? product.fitWithin : product.fitOver;
}

export function findProduct(slug) {
  return products.find((product) => product.slug === slug);
}
