

const productsArray = [
    {
        id: "price_1OxaOkAVeVi9NDfuBoh0uDBS",
        title: "Door to Door",
        price: '30.00',
        description:'<p>64 pages coloured print on newsprint, measuring at 11”x15”, featuring 77 pictures, an essay titled « در پیرامون » /"Around" written by Safa Ghasemi, and a forward written by Zari G.  </p><p>This book is designed and branded by Marlo Yarlo (<a href="https://www.marloyarlo.com/" target="_blank">https://www.marloyarlo.com/</a>)</p><p><em>Door to Door</em> is a selection of photos taken on a few-months long trip to my home country of Iran in 2022, the longest period of time I’ve spent in the country by myself as an adult. Although everything felt familiar, I felt like an alien observing a culture that is both mine and no longer mine. As an almost daily ritual, I captured these snapshots in different parts of the country while I would go for long walks. The material making of the country, how things felt on my hands, the smells, and the noises of the streets are all too familiar – they’ve stood still but somehow time has moved on without me present.</p><p>I’ve focused here on doors that blend into the fabric of the streets. These doors are often much older than I am. Each holds an untold story –  what is behind the door, what happens in front of the door and of the material making of the door itself.  From the patterns chosen, to the colors painted and repainted at different points in time by different owners and caretakers, each has its own unique reasoning for being. <em>Door to Door</em> is a nod to the mundane that remains still in the dust of the streets, painted and repainted again over time. This is a project of love for the people, places and things all existing in harmony and contradiction. </p>',
        img:  'mohammadPort/Door_to_Door_FINAL_031824_Spreads_oteubb'
    },
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };





