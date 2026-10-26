function getRocketJSON() {
    const bpString = document.getElementById("parts-json").value;
    const bpJSON = JSON.parse(bpString);
    getRocketPrice(bpJSON.parts);
}

function getRocketPrice(parts) {
    const priceHeading = document.getElementById("price-heading");
    priceHeading.innerText = "Price: $3.14159265"
    let price = 0;
    parts.forEach(part => {
        const partName = part.n;
        const partNumValues = part.N;
        if (partName.includes("Fairing")) {
            if (partName.includes("Procedural")) {
                if (partName.includes("Ring")) {
                    const width = partNumValues.width;
                    const height = 3;
                    console.log(2 * (width + height));
                    price += 2 * (width + height);
                }
                else {
                    const width = (partNumValues.width_a + partNumValues.width_b) / 2
                    const height = partNumValues.height;
                    console.log(2 * (width + height));
                    price += 2 * (width + height);
                }
            } 
            if (partName.includes("Round")) {
                const width = partNumValues.width_original;
                const height = 2 * width;
                console.log(2 * (width + height));
                price += 2 * (width + height);
            }
            else {
                const width = partNumValues.width_original;
                const height = partNumValues.height;
                console.log(2 * (width + height));
                price += 2 * (width + height);
            }
        }
        if (partName.includes("Fuel Tank")) {
            if (partName.includes("Procedural")) {
                if (partName.includes("Cone")) {
                    const width = partNumValues.width;
                    const height = width * 2;
                    console.log(10 * (width + height));
                    price += 10 * (width + height);
                } else {
                    const width = (partNumValues.width_a + partNumValues.width_b) / 2;
                    const height = partNumValues.height;
                    console.log(10 * (width + height));
                    price += 10 * (width + height)
                }
            } else {
                const width = partNumValues.width_original;
                const height = partNumValues.height;
                console.log(10 * (width + height));
                price += 10 * (width + height);
            }
        }
        if (partName.includes("Probe")) {
            if (partName.includes("Procedural")) {
                console.log(5 + partNumValues.torque);
                price += 5 + partNumValues.torque;
            } else {
                price += 9
            }
        }
        if (partName.includes("Heat Shield")) {
            console.log(partNumValues.size);
            price += 3 * partNumValues.size;
        }
        if (partName.includes("Structural") || partName.includes("Strut")) {
            console.log(partNumValues.size);
            price += partNumValues.size
        }
        if (partName.includes("Procedural") && partName.includes("Engine")) {
            console.log(5 * partNumValues.thrust ** 0.6 * (partNumValues.isp / 300) ** 3);
            price += 5 * partNumValues.thrust ** 0.6 * (partNumValues.isp / 300) ** 3
        }
    });
    priceHeading.innerText = `Price: $${price.toFixed(2)}`
}