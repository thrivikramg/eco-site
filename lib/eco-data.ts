export interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    author: string;
    date: string;
    readTime: string;
    externalLink?: string;
    content?: string; // For internal pages
}

// Base articles from all categories
const floraFaunaArticles: Article[] = [
    {
        id: "ff1",
        title: "10 Rare Animal Species Making a Comeback",
        excerpt: "Thanks to conservation efforts, these endangered species are showing promising signs of recovery.",
        category: "Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
        author: "Dr. Maya Patel",
        date: "May 23, 2025",
        readTime: "8 min read",
        externalLink: "https://www.nationalgeographic.com/animals/article/endangered-species-recovery-success-stories"
    },
    {
        id: "ff2",
        title: "The Hidden World of Mycorrhizal Networks",
        excerpt: "How underground fungal networks help trees communicate and share resources.",
        category: "Plant Biology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
        author: "Prof. Suzanne Simard",
        date: "May 20, 2025",
        readTime: "12 min read",
        externalLink: "https://www.scientificamerican.com/article/do-trees-talk-to-each-other/"
    },
    {
        id: "ff3",
        title: "Monarch Butterfly Migration: A Spectacular Journey",
        excerpt: "Following the 3,000-mile journey of one of nature's most impressive migrations.",
        category: "Wildlife",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
        author: "Carlos Gutierrez",
        date: "May 18, 2025",
        readTime: "10 min read",
        externalLink: "https://www.worldwildlife.org/species/monarch-butterfly"
    },
    {
        id: "ff4",
        title: "Keystone Species: The Architects of Ecosystems",
        excerpt: "How certain species have disproportionate effects on their environments.",
        category: "Ecology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
        author: "Dr. Jane Goodall",
        date: "May 15, 2025",
        readTime: "11 min read",
        externalLink: "https://www.britannica.com/science/keystone-species"
    },
    {
        id: "ff5",
        title: "The Remarkable Resilience of Mangrove Forests",
        excerpt: "How these unique coastal ecosystems protect shorelines and support biodiversity.",
        category: "Ecosystems",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015029/intricate-line-art-earth-surrounded-diverse-flora-fauna-drawing-save-366564860_rinsr9.jpg`,
        author: "Lin Wei Chen",
        date: "May 12, 2025",
        readTime: "9 min read",
        externalLink: "https://www.iucn.org/resources/issues-brief/mangroves"
    },
    {
        id: "ff6",
        title: "Urban Wildlife: Adapting to City Life",
        excerpt: "How animals are evolving to thrive in our concrete jungles.",
        category: "Urban Ecology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015029/intricate-line-art-earth-surrounded-diverse-flora-fauna-drawing-save-366564860_rinsr9.jpg`,
        author: "Dr. Mark Johnson",
        date: "May 9, 2025",
        readTime: "7 min read",
        externalLink: "https://theconversation.com/urban-rewilding-the-wildlife-thriving-in-cities-around-the-world"
    },
    {
        id: "ff7",
        title: "Pollinator Decline: Causes and Solutions",
        excerpt: "Understanding why bees and other pollinators are disappearing and how to help.",
        category: "Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015102/826760c4-5f79-4a56-b01c-bec5673f42a0_dzlrdz.jpg`,
        author: "Dr. Elizabeth Warren",
        date: "May 6, 2025",
        readTime: "13 min read",
        externalLink: "https://www.nrdc.org/stories/buzz-about-disappearing-bees"
    },
    {
        id: "ff8",
        title: "Invasive Species: Ecological Disruptors",
        excerpt: "How non-native species can transform ecosystems and threaten biodiversity.",
        category: "Ecology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015104/hq720_sv2zwd.jpg`,
        author: "Prof. Daniel Smith",
        date: "May 3, 2025",
        readTime: "10 min read",
        externalLink: "https://www.nature.org/en-us/about-us/where-we-work/united-states/indiana/stories-in-indiana/invasive-species-101/"
    }
];

const oceanographyArticles: Article[] = [
    {
        id: "oc1",
        title: "Ocean Acidification: The Silent Crisis",
        excerpt: "How rising carbon dioxide levels are changing the chemistry of our oceans and threatening marine life.",
        category: "Climate Impact",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Richard Feely",
        date: "May 22, 2025",
        readTime: "11 min read",
        externalLink: "https://www.noaa.gov/ocean-acidification"
    },
    {
        id: "oc2",
        title: "The Great Barrier Reef: Fighting for Survival",
        excerpt: "Current conservation efforts to protect the world's largest coral reef system.",
        category: "Coral Reefs",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Ove Hoegh-Guldberg",
        date: "May 19, 2025",
        readTime: "14 min read",
        externalLink: "https://www.barrierreef.org/the-reef/threats"
    },
    {
        id: "oc3",
        title: "Deep Sea Hydrothermal Vents: Oases of Life",
        excerpt: "Exploring the unique ecosystems thriving in the most extreme environments on Earth.",
        category: "Marine Biology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Cindy Van Dover",
        date: "May 16, 2025",
        readTime: "9 min read",
        externalLink: "https://oceanservice.noaa.gov/facts/vents.html"
    },
    {
        id: "oc4",
        title: "Plastic Pollution in Our Oceans: A Global Crisis",
        excerpt: "The devastating impact of plastic waste on marine ecosystems and what we can do about it.",
        category: "Pollution",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Marcus Eriksen",
        date: "May 13, 2025",
        readTime: "12 min read",
        externalLink: "https://www.plasticpollutioncoalition.org/the-problem-of-plastic"
    },
    {
        id: "oc5",
        title: "The Mysterious World of Cephalopods",
        excerpt: "Octopuses, squids, and cuttlefish: The intelligent aliens of our oceans.",
        category: "Marine Life",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Jennifer Mather",
        date: "May 10, 2025",
        readTime: "8 min read",
        externalLink: "https://www.scientificamerican.com/article/the-mind-of-an-octopus/"
    },
    {
        id: "oc6",
        title: "Ocean Currents and Climate Regulation",
        excerpt: "How ocean circulation patterns help regulate Earth's climate system.",
        category: "Oceanography",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Stefan Rahmstorf",
        date: "May 7, 2025",
        readTime: "10 min read",
        externalLink: "https://climate.nasa.gov/news/2950/ocean-worlds-water-is-common-in-the-outer-solar-system/"
    },
    {
        id: "oc7",
        title: "Bioluminescence: Living Light in the Deep",
        excerpt: "The science behind glowing marine organisms and their evolutionary advantages.",
        category: "Marine Biology",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Edith Widder",
        date: "May 4, 2025",
        readTime: "7 min read",
        externalLink: "https://ocean.si.edu/ocean-life/fish/bioluminescence"
    },
    {
        id: "oc8",
        title: "Seagrass Meadows: The Forgotten Carbon Sinks",
        excerpt: "How underwater grasslands capture carbon and support marine biodiversity.",
        category: "Ecosystems",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750015821/6253e8d4f091b0062a75b345_francesco-ungaro-MJ1Q7hHeGlA-unsplash-2_nn7oke.jpg`,
        author: "Dr. Carlos Duarte",
        date: "May 1, 2025",
        readTime: "9 min read",
        externalLink: "https://www.sciencedirect.com/science/article/pii/S0025326X18307975"
    }
];

const wasteManagementArticles: Article[] = [
    {
        id: "wm1",
        title: "Zero Waste Living: A Practical Guide",
        excerpt: "How to dramatically reduce your household waste with simple lifestyle changes.",
        category: "Lifestyle",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Lauren Singer",
        date: "May 24, 2025",
        readTime: "9 min read",
        externalLink: "https://www.goingzerowaste.com/blog/the-ultimate-step-by-step-guide-to-going-zero-waste"
    },
    {
        id: "wm2",
        title: "Composting 101: Transform Your Food Waste",
        excerpt: "A beginner's guide to starting your own compost system at home.",
        category: "Composting",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Dr. Elaine Ingham",
        date: "May 21, 2025",
        readTime: "8 min read",
        externalLink: "https://www.epa.gov/recycle/composting-home"
    },
    {
        id: "wm3",
        title: "Plastic Recycling: Truth vs. Myth",
        excerpt: "What actually happens to your plastic waste and how to make better recycling choices.",
        category: "Recycling",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Roland Geyer, Ph.D.",
        date: "May 18, 2025",
        readTime: "12 min read",
        externalLink: "https://www.nationalgeographic.com/science/article/plastic-pollution-huge-problem-not-too-late"
    },
    {
        id: "wm4",
        title: "Electronic Waste: The Growing Environmental Crisis",
        excerpt: "The environmental impact of discarded electronics and how to dispose of them responsibly.",
        category: "E-Waste",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Dr. Josh Lepawsky",
        date: "May 15, 2025",
        readTime: "10 min read",
        externalLink: "https://www.ifixit.com/Right-to-Repair/E-waste"
    },
    {
        id: "wm5",
        title: "The Circular Economy: Reimagining Waste as a Resource",
        excerpt: "How businesses and communities are redesigning systems to eliminate waste.",
        category: "Sustainability",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Kate Raworth",
        date: "May 12, 2025",
        readTime: "11 min read",
        externalLink: "https://ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview"
    },
    {
        id: "wm6",
        title: "Textile Waste: The Fast Fashion Problem",
        excerpt: "The environmental impact of clothing waste and sustainable alternatives.",
        category: "Fashion",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Dr. Linda Greer",
        date: "May 9, 2025",
        readTime: "8 min read",
        externalLink: "https://www.fashionrevolution.org/waste/"
    },
    {
        id: "wm7",
        title: "Bioplastics: Sustainable Solution or False Promise?",
        excerpt: "Examining the environmental impact of biodegradable and compostable plastics.",
        category: "Materials",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Dr. Ramani Narayan",
        date: "May 6, 2025",
        readTime: "13 min read",
        externalLink: "https://www.sciencedirect.com/science/article/abs/pii/S0141391019301387"
    },
    {
        id: "wm8",
        title: "Waste-to-Energy: A Sustainable Solution?",
        excerpt: "Exploring the benefits and controversies of converting waste to renewable energy.",
        category: "Energy",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750003634/Waste_Management_vsu5lb.jpg`,
        author: "Dr. Marco Castaldi",
        date: "May 3, 2025",
        readTime: "10 min read",
        externalLink: "https://www.energy.gov/eere/bioenergy/waste-energy"
    }
];

const gardeningArticles: Article[] = [
    {
        id: "gt1",
        title: "Companion Planting: Nature's Pest Control",
        excerpt: "Which plants work well together to boost growth and naturally deter pests.",
        category: "Organic Gardening",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Jessica Walliser",
        date: "May 24, 2025",
        readTime: "10 min read",
        externalLink: "https://savvygardening.com/companion-planting-chart/"
    },
    {
        id: "gt2",
        title: "No-Dig Gardening: Better Results with Less Work",
        excerpt: "How to build fertile soil and grow healthier plants by disturbing the soil less.",
        category: "Sustainable Techniques",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Charles Dowding",
        date: "May 22, 2025",
        readTime: "8 min read",
        externalLink: "https://charlesdowding.co.uk/no-dig-growing/how-to-start-no-dig/"
    },
    {
        id: "gt3",
        title: "Composting Masterclass: From Kitchen Scraps to Garden Gold",
        excerpt: "A comprehensive guide to creating nutrient-rich compost for your garden.",
        category: "Composting",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Dr. Elaine Ingham",
        date: "May 20, 2025",
        readTime: "12 min read",
        externalLink: "https://www.permaculturenews.org/2018/09/12/the-art-and-science-of-making-a-hot-compost-pile/"
    },
    {
        id: "gt4",
        title: "Rainwater Harvesting for Garden Irrigation",
        excerpt: "Simple systems to collect and use rainwater in your garden.",
        category: "Water Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Brad Lancaster",
        date: "May 18, 2025",
        readTime: "9 min read",
        externalLink: "https://www.harvestingrainwater.com/rainwater-harvesting-inforesources/rainwater-harvesting-online-resources/"
    },
    {
        id: "gt5",
        title: "Permaculture Principles for Home Gardens",
        excerpt: "How to apply permaculture ethics and principles to create a sustainable garden ecosystem.",
        category: "Permaculture",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Geoff Lawton",
        date: "May 16, 2025",
        readTime: "14 min read",
        externalLink: "https://www.permaculturenews.org/what-is-permaculture/"
    },
    {
        id: "gt6",
        title: "Growing Food in Small Spaces: Urban Gardening Solutions",
        excerpt: "Innovative techniques for growing vegetables in limited spaces.",
        category: "Urban Gardening",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Kevin Lee Jacobs",
        date: "May 14, 2025",
        readTime: "7 min read",
        externalLink: "https://www.urbanfarmonline.com/urban-gardening/backyard-gardening/container-gardening.aspx"
    },
    {
        id: "gt7",
        title: "Natural Pest Management: Beyond Chemicals",
        excerpt: "Effective strategies to manage garden pests without synthetic pesticides.",
        category: "Pest Control",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Dr. Jessica Shade",
        date: "May 12, 2025",
        readTime: "11 min read",
        externalLink: "https://www.gardensalive.com/product/natural-pest-control"
    },
    {
        id: "gt8",
        title: "Seed Saving: Preserving Biodiversity in Your Garden",
        excerpt: "How to collect, process, and store seeds from your garden for future planting.",
        category: "Seed Saving",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750016659/Container-Garden-1024x1024_gkeb6g.jpg`,
        author: "Vandana Shiva",
        date: "May 10, 2025",
        readTime: "9 min read",
        externalLink: "https://www.seedsavers.org/learn#save"
    }
];

const plantDiseaseArticles: Article[] = [
    {
        id: "pd1",
        title: "Early Blight in Tomatoes: Identification and Treatment",
        excerpt: "How to identify, prevent, and treat early blight fungal disease in tomato plants.",
        category: "Fungal Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012929/plant-disease_uhgzkv.png`,
        author: "Dr. Sarah Williams",
        date: "May 22, 2025",
        readTime: "7 min read",
        externalLink: "https://www.gardeningknowhow.com/edible/vegetables/tomato/early-blight-alternaria-solani.htm"
    },
    {
        id: "pd2",
        title: "Identifying Powdery Mildew: The White Fungus",
        excerpt: "Recognizing symptoms and effective treatments for this common plant disease.",
        category: "Fungal Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012879/pdis-1645041253433_eje9ik.png`,
        author: "Dr. Robert Martin",
        date: "May 19, 2025",
        readTime: "6 min read",
        externalLink: "https://www.thespruce.com/identifying-and-controlling-powdery-mildew-1402468"
    },
    {
        id: "pd3",
        title: "Root Rot: Causes, Symptoms, and Solutions",
        excerpt: "How overwatering leads to root rot and what you can do to save affected plants.",
        category: "Fungal Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012922/ImageForArticle_266_17187279379162919_pcfk2p.jpg`,
        author: "Dr. Lisa Peterson",
        date: "May 16, 2025",
        readTime: "8 min read",
        externalLink: "https://extension.umn.edu/solve-problem/root-rot-plants"
    },
    {
        id: "pd4",
        title: "Fire Blight in Fruit Trees: Prevention and Control",
        excerpt: "Protecting apple and pear trees from this destructive bacterial disease.",
        category: "Bacterial Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012801/leaf-spots_jsttua.jpg`,
        author: "Dr. James Chen",
        date: "May 13, 2025",
        readTime: "9 min read",
        externalLink: "https://www.canr.msu.edu/resources/fire_blight"
    },
    {
        id: "pd5",
        title: "Viral Mosaics: Identification and Management",
        excerpt: "How to recognize and manage mosaic virus infections in vegetables and ornamentals.",
        category: "Viral Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012757/Botrytis_Blight_of_Peony1801_qf06wy.jpg`,
        author: "Dr. Emily Johnson",
        date: "May 10, 2025",
        readTime: "10 min read",
        externalLink: "https://extension.psu.edu/virus-diseases-of-plants"
    },
    {
        id: "pd6",
        title: "Downy Mildew in Cucurbits: A Grower's Guide",
        excerpt: "Managing downy mildew in cucumbers, squash, and other cucurbit crops.",
        category: "Fungal Diseases",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750012174/powdery-mildew-powdery-mildew-on-squash-leaf-shutterstock-com_13365_tykont.jpg`,
        author: "Dr. Thomas Rodriguez",
        date: "May 7, 2025",
        readTime: "8 min read",
        externalLink: "https://extension.umn.edu/disease-management/downy-mildew-cucurbits"
    }
];

const sanctuariesArticles: Article[] = [
    {
        id: "s1",
        title: "Bandipur Tiger Reserve: A Conservation Success Story",
        excerpt: "How careful management has helped tiger populations rebound in this Indian sanctuary.",
        category: "Tiger Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750014294/112845083_wdxvhi.png`,
        author: "Rahul Sharma",
        date: "May 23, 2025",
        readTime: "15 min read",
        externalLink: "https://www.bandipurtigerreserve.in/"
    },
    {
        id: "s2",
        title: "Serengeti National Park: The Great Migration",
        excerpt: "Tracking the annual wildebeest migration across Tanzania and Kenya.",
        category: "African Wildlife",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750014035/Elephant_family_at_jim_corbett_national_park_uzvlby.jpg`,
        author: "Dr. Jane Goodall",
        date: "May 20, 2025",
        readTime: "14 min read",
        externalLink: "https://www.nationalgeographic.com/animals/article/serengeti-migration-safari-guide"
    },
    {
        id: "s3",
        title: "The Amazon Rainforest: Protecting Earth's Biodiversity Hotspot",
        excerpt: "Conservation efforts in the world's largest tropical rainforest.",
        category: "Rainforest Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013753/1725031216118_xxs6ad.jpg`,
        author: "Dr. Carlos Nobre",
        date: "May 17, 2025",
        readTime: "12 min read",
        externalLink: "https://www.worldwildlife.org/places/amazon"
    },
    {
        id: "s4",
        title: "Great Barrier Reef Marine Park: Ocean Conservation",
        excerpt: "Efforts to protect the world's largest coral reef system from climate change.",
        category: "Marine Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013980/jim-corbett-national_wwtfqp.jpg`,
        author: "Dr. Ove Hoegh-Guldberg",
        date: "May 14, 2025",
        readTime: "11 min read",
        externalLink: "https://greatbarrierreef.org/"
    },
    {
        id: "s5",
        title: "Yellowstone National Park: America's First National Park",
        excerpt: "The history and ecological significance of this pioneer in conservation.",
        category: "National Parks",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750014294/112845083_wdxvhi.png`,
        author: "Dr. Robert Smith",
        date: "May 11, 2025",
        readTime: "13 min read",
        externalLink: "https://www.nps.gov/yell/index.htm"
    },
    {
        id: "s6",
        title: "Galápagos Marine Reserve: Protecting Darwin's Laboratory",
        excerpt: "Conservation efforts in the waters surrounding the iconic Galápagos Islands.",
        category: "Marine Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013952/Master_q6wqeb.jpg`,
        author: "Dr. Patricia Parker",
        date: "May 8, 2025",
        readTime: "10 min read",
        externalLink: "https://www.darwinfoundation.org/en/"
    },
    {
        id: "s7",
        title: "Kruger National Park: Big Five Conservation",
        excerpt: "Efforts to protect lions, elephants, rhinos, leopards and buffalo in South Africa.",
        category: "African Wildlife",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750013984/Longtailed-broadbill-Bird-in-Corbett_xn4lfi.jpg`,
        author: "Dr. Sam Ferreira",
        date: "May 5, 2025",
        readTime: "9 min read",
        externalLink: "https://www.sanparks.org/parks/kruger/"
    },
    {
        id: "s8",
        title: "Sundarbans National Park: Protecting the Bengal Tiger",
        excerpt: "Conservation challenges in the world's largest mangrove forest.",
        category: "Tiger Conservation",
        image: `https://res.cloudinary.com/dc2mzcoqr/image/upload/v1750014294/112845083_wdxvhi.png`,
        author: "Dr. Priya Mondal",
        date: "May 2, 2025",
        readTime: "11 min read",
        externalLink: "https://whc.unesco.org/en/list/798/"
    }
];

// Combine all base articles
const allBaseArticles = [
    ...floraFaunaArticles,
    ...oceanographyArticles,
    ...wasteManagementArticles,
    ...gardeningArticles,
    ...plantDiseaseArticles,
    ...sanctuariesArticles
];

// Titles for generation
const titlesMap: Record<string, string[]> = {
    "flora-fauna": [
        "The Secret Life of Carnivorous Plants", "Coral Reef Restoration Techniques", "Wildlife Corridors: Connecting Habitats",
        "Ancient Forests: The World's Oldest Trees", "Bird Migration Patterns in a Changing Climate", "Rewilding: Bringing Back Lost Species",
        "Symbiotic Relationships in Nature", "The Impact of Light Pollution on Nocturnal Animals", "Seed Banks: Preserving Biodiversity for the Future",
        "How Animals Navigate: Nature's Compass", "Extremophiles: Life in Harsh Environments", "Freshwater Ecosystems Under Threat"
    ],
    "oceanography": [
        "Mapping the Ocean Floor: New Discoveries", "The Blue Carbon Initiative", "Marine Protected Areas",
        "Ocean Deoxygenation", "Kelp Forests: Underwater Jungles", "The Role of Phytoplankton",
        "Sharks: Misunderstood Guardians", "Rising Sea Levels", "Sustainable Fisheries Management"
    ],
    "waste-management": [
        "Community Composting Initiatives", "The Problem with Single-Use Plastics", "Innovative Waste Collection Systems",
        "Reducing Food Waste", "Commercial Waste Management", "Hazardous Waste Disposal",
        "Upcycling: Creative Reuse", "Landfill Design", "Construction Waste Reduction"
    ],
    "gardening-tips": [
        "Soil Testing and Amendment Guide", "Vertical Gardening", "Heirloom Vegetables",
        "Season Extension Techniques", "Medicinal Herb Garden", "Drought-Resistant Gardening",
        "Attracting Beneficial Insects", "Cover Crops", "Native Plant Gardening"
    ],
    "plant-disease": [
        "Leaf Spot Diseases", "Black Spot on Roses", "Bacterial Wilt",
        "Fusarium Wilt", "Rust Diseases", "Verticillium Wilt",
        "Clubroot Disease", "Anthracnose", "Late Blight"
    ],
    "sanctuaries": [
        "Everglades National Park", "Komodo National Park", "Kaziranga National Park",
        "Borneo Rainforest", "Monarch Butterfly Biosphere Reserve", "Arctic National Wildlife Refuge",
        "Okavango Delta", "Bwindi Impenetrable National Park", "Pantanal Conservation Area"
    ]
};

// Deterministic generation
export function getArticlesByCategory(category: string, count: number): Article[] {
    let base: Article[] = [];
    let prefix = "";

    switch (category) {
        case "flora-fauna": base = floraFaunaArticles; prefix = "ff"; break;
        case "oceanography": base = oceanographyArticles; prefix = "oc"; break;
        case "waste-management": base = wasteManagementArticles; prefix = "wm"; break;
        case "gardening-tips": base = gardeningArticles; prefix = "gt"; break;
        case "plant-disease": base = plantDiseaseArticles; prefix = "pd"; break;
        case "sanctuaries": base = sanctuariesArticles; prefix = "s"; break;
        default: return [];
    }

    const result = [...base];
    const titles = titlesMap[category] || [];

    // Seeded random-like generation (deterministic based on index)
    for (let i = 0; result.length < count; i++) {
        const title = titles[i % titles.length];
        const id = `${prefix}${result.length + 1}`;

        // Check if we've looped through titles, add suffix if so
        const loopCount = Math.floor(i / titles.length);
        const displayTitle = loopCount > 0 ? `${title} - Part ${loopCount + 1}` : title;

        result.push({
            id,
            title: displayTitle,
            excerpt: `Comprehensive guide and insights about ${title.toLowerCase()}. Learn more about this important topic in our detailed article.`,
            category: base[i % base.length].category,
            image: base[i % base.length].image,
            author: base[i % base.length].author,
            date: `May ${((i * 3) % 28) + 1}, 2025`,
            readTime: `${((i * 7) % 10) + 5} min read`,
            externalLink: base[i % base.length].externalLink,
            content: `
        <h2>Introduction</h2>
        <p>This is a detailed article about <strong>${displayTitle}</strong>. It covers various aspects of the topic including its importance, current state, and future prospects.</p>
        
        <h2>Key Points</h2>
        <ul>
          <li>Understanding the basics of ${title.toLowerCase()}</li>
          <li>Impact on the environment and ecosystem</li>
          <li>Conservation and sustainability efforts</li>
          <li>What you can do to help</li>
        </ul>

        <h2>Deep Dive</h2>
        <p>In recent years, ${title.toLowerCase()} has become a significant topic of discussion among experts. Studies show that paying attention to this area can yield substantial ecological benefits.</p>
        
        <h2>Conclusion</h2>
        <p>We hope this guide has provided valuable insights into ${displayTitle}. Stay tuned for more updates and related articles.</p>
      `
        });
    }

    return result;
}

export function getAllArticles(): Article[] {
    return allBaseArticles;
}

export function getArticleById(id: string): Article | undefined {
    // Check base articles first
    const found = allBaseArticles.find(a => a.id === id);
    if (found) return found;

    // If not found, try to generate it (reverse engineer from ID)
    // This is a bit tricky, but for now let's just search in generated lists
    // We'll generate a reasonable amount for each category to find it
    const categories = Object.keys(titlesMap);
    for (const cat of categories) {
        const articles = getArticlesByCategory(cat, 60); // Generate up to 60 per category
        const hit = articles.find(a => a.id === id);
        if (hit) return hit;
    }

    return undefined;
}

export function getLatestArticles(count: number): Article[] {
    return [...allBaseArticles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}
