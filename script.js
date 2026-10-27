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
                if (partName.includes("B_Ring")) {
                    const width = partNumValues.width;
                    const height = 3;
                    console.log(2 * (width + height));
                    price += 2 * (width + height);
                    return;
                }
                else {
                    const width = (partNumValues.width_a + partNumValues.width_b) / 2;
                    const height = partNumValues.height;
                    console.log(2 * (width + height));
                    price += 2 * (width + height);
                    return;
                }
            } 
            if (partName.includes("Round")) {
                const width = partNumValues.width_original;
                const height = 2 * width;
                console.log(2 * (width + height));
                price += 2 * (width + height);
                return;
            }
            else {
                const width = (partNumValues.width_a + partNumValues.width_b) / 2;
                const height = partNumValues.height;
                console.log(partName, width, height, 2 * (width + height));
                price += 2 * (width + height);
                return;
            }
        }
        if (partName.includes("Fuel Tank")) {
            if (partName.includes("Procedural")) {
                if (partName.includes("Cone")) {
                    const width = partNumValues.width;
                    const height = width * 2;
                    console.log(10 * (width + height));
                    price += 10 * (width + height);
                    return;
                } else {
                    const width = (partNumValues.width_a + partNumValues.width_b) / 2;
                    const height = partNumValues.height;
                    console.log(10 * (width + height));
                    price += 10 * (width + height)
                    return;
                }
            } else {
                const width = partNumValues.width_original;
                const height = partNumValues.height;
                console.log(10 * (width + height));
                price += 10 * (width + height);
                return;
            }
        }
        if (partName.includes("Probe")) {
            if (partName.includes("Procedural")) {
                console.log(5 + partNumValues.torque);
                price += 5 + partNumValues.torque;
                return;
            } else {
                price += 9
                return;
            }
        }
        if (partName.includes("Heat Shield")) {
            console.log(partNumValues.size);
            price += 3 * partNumValues.size;
            return;
        }
        if (partName.includes("Structural") || partName.includes("Strut")) {
            console.log(partNumValues.size);
            price += partNumValues.size
            return;
        }
        if (partName.includes("Engine")) {
            if (partName.includes("Procedural")) {
                console.log(5 * partNumValues.thrust ** 0.6 * (partNumValues.isp / 300) ** 3);
                price += 5 * partNumValues.thrust ** 0.6 * (partNumValues.isp / 300) ** 3
                return;
            } else {
                const ENGINE_DATA = {
                    Titan: {
                        thrust: 400,
                        isp: 240
                    },
                    Hawk: {
                        thrust: 120,
                        isp: 240
                    },
                    Fronteir: {
                        thrust: 100,
                        isp: 290
                    },
                    Valiant: {
                        thrust: 40,
                        isp: 280
                    },
                    Kolibri: {
                        thrust: 15,
                        isp: 260
                    }
                };
                ENGINE_DATA.forEach(([engineName, engineData]) => {
                    if (partName.includes(engineName)) {
                        price += 5 * engineData.thrust ** 0.6 * (isp / 300) ** 3;
                    }
                });
                return;
            }
        }
    });
    priceHeading.innerText = `Price: $${price.toFixed(2)}`
}