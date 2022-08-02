const product = "MSI GeForce RTX 3080";
const productReq = `https://ledenicheur.fr/_internal/graphql?release=2022-08-02T11:02:53Z|c230db0a&version=0ae15f&main=search&variables=%7B%22id%22%3A%22search%22%2C%22query%22%3A%22${product}%22%2C%22sort%22%3A%22score%22%2C%22order%22%3A%22desc%22%2C%22offset%22%3A0%2C%22limit%22%3A100%2C%22filters%22%3A%5B%7B%22id%22%3A%22category_id%22%2C%22selected%22%3A%5B%22pc%3Acartes-graphiques%22%5D%7D%2C%7B%22id%22%3A%22brand_id%22%2C%22selected%22%3A%5B%5D%7D%2C%7B%22id%22%3A%22lowest_price%22%7D%2C%7B%22id%22%3A%22user_rating%22%7D%5D%2C%22productModes%22%3A%5B%22product%22%2C%22raw%22%5D%2C%22newSearch%22%3Atrue%2C%22categoryFilters%22%3A%5B%22pc%3Acartes-graphiques%22%5D%2C%22brandFilters%22%3A%5B%5D%2C%22getExperts%22%3Afalse%2C%22campaignId%22%3A4%2C%22personalizationClientId%22%3A%22347069442.1649941170%22%2C%22pulseEnvironmentId%22%3A%22sdrn%3Aschibsted%3Aenvironment%3Aundefined%22%7D`;

fetch(productReq)
    .then(res => res.json())
    .then(productData => {
        productData.data.newSearch.results.products.nodes.forEach(element => {
            let productId = element.id;
            const detailReq = `https://ledenicheur.fr/_internal/graphql?release=2022-07-28T11%3A30%3A30Z%7C2497f072&main=product&variables=%7B%22id%22%3A${productId}%2C%22offset%22%3A0%2C%22section%22%3A%22main%22%2C%22marketCode%22%3A%22fr%22%2C%22personalizationExcludeCategories%22%3A%5B%5D%2C%22recommendationsContextId%22%3A%22product-page%22%2C%22includeSecondary%22%3Afalse%2C%22excludeTypes%22%3A%5B%22not_available_for_purchase%22%2C%22pickup_only%22%2C%22used_product%22%2C%22not_in_mint_condition%22%5D%2C%22variants%22%3Anull%2C%22variantSizes%22%3Anull%2C%22advized%22%3Afalse%2C%22condition%22%3A%22new%22%2C%22filter%22%3Anull%2C%22campaigns%22%3Anull%2C%22priceDisplay%22%3A%22price-excludes-shipping%22%2C%22sorting%22%3A%22price%22%2C%22options%22%3A%7B%22showPricesInclShipping%22%3Afalse%2C%22showInternational%22%3Afalse%2C%22showUnavailable%22`;
            const detailReq1 = `%3Afalse%2C%22showPickupOnly%22%3Afalse%2C%22showUsedProducts%22%3Afalse%2C%22showNotInMintCondition%22%3Afalse%7D%2C%22priceList%22%3Atrue%2C%22includeShipping%22%3Afalse%2C%22campaignId%22%3A4%2C%22personalizationClientId%22%3A%22856165030.1659372995%22%2C%22pulseEnvironmentId%22%3A%22sdrn%3Aschibsted%3Aenvironment%3Aundefined%22%7D`
            fetch(detailReq + detailReq1)
                .then(detailRes => detailRes.json())
                .then(detailData => {
                    let price = detailData.data.product.prices.nodes[0].price.exclShipping;
                    console.log(`Product: ${element.name} found at Price: ${price} €`);
                })
                .catch(err => {
                    if(element.priceSummary.regular != null || element.priceSummary.regular != undefined) {
                        console.log(`Product: ${element.name} found at Price: ${element.priceSummary.regular} €`);
                    } else {
                        console.error(`Product: ${element.name} not found`);
                    }
                });
        });
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        console.log("Request finished")
    });