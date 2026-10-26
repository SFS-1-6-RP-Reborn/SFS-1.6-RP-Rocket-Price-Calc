/* Chat:
Engine: Hello
Roshan: Hi
Engine: Bye
Roshan: Bye
*/

#include "App.hpp"
#include <string>
#include <cmath> // Use for fucking engines cuz they == retarded
#include <fstream> // I think this is the file IO header
#include <iostream>
#include <exception>

App::App() {
    this->setWindowTitle("SFS 1.6 RP Reborn Rocket Price Calculator");
    this->resize(960, 480);

    QLabel* priceLabel = new QLabel("Rocket Price will be here", this);
    priceLabel->move((int)this->width() / 2 - priceLabel->width(), 440);
    priceLabel->setStyleSheet(
        "QLabel {"
        "   font-size: 20px;"
        "   font-weight: bold;"
        "}"
    );
    priceLabel->setFixedSize(200, 30);

    QPushButton* getBpButton = new QPushButton("Bp Please", this);
    getBpButton->setStyleSheet(
        "QPushButton {"
        "   background-color: rgba(70, 0, 255, 204);"
        "   border: 2px solid white;"
        "   border-radius: 10px;"
        "}"
        "QPushButton:hover {"
        "   background-color: rgba(50, 0, 255, 204);"
        "}"
    ); // the style sheet is only really used once so it isnt a big deal that it is hardcoded here
    this->connect(getBpButton, &QPushButton::clicked, [this, priceLabel]{
        QString fileName = QFileDialog::getOpenFileName(
            this,
            "Open BP file",
            "",
            "Text files (*.txt);;All Files (*)"
        );
        if (!fileName.isEmpty()) {
            try {
                std::ifstream BpFile(fileName.toStdString());
                json BpJSON = json::parse(BpFile); // oh i need json::parse()
                int price = this->calcPrice(BpJSON["parts"]);
                priceLabel->setText("Price: $" + QString::number(price));
            } catch (std::exception& e) {
                std::cout << e.what() << std::endl;
            }
        }
    });
    getBpButton->move((int)this->width() / 2 - getBpButton->width(), 100);
}

int App::calcPrice(json parts) {
    int price = 0;

    for (json part: parts) {
        if (part["n"].get<std::string>().find("Fairing") != std::string::npos) {
            json numVars = part["N"];
            if (part["n"].get<std::string>().find("Procedural") != std::string::npos) {
                int width = (int)numVars.value("width_a", 1) + numVars.value("width_b", 1) / 2;
                int height = numVars.value("height", 1);
                price += 2 * (width + height);
            } else {
                int width = numVars.value("width", 1);
                int height = numVars.value("height", 1);
                price += 2 * (width + height);
            }
        }
        if (part["n"].get<std::string>().find("Fuel Tank") != std::string::npos) {
            json numVars = part["N"];
            if (part["n"].get<std::string>().find("Procedural") != std::string::npos) {
                if (part["n"].get<std::string>().find("Cone") != std::string::npos) {
                    int width = numVars.value("width", 1);
                    int height = numVars.value("height", 1);
                    price += 10 * (width + height);
                } else {
                    int width = (int)numVars.value("width_a", 1) + numVars.value("width_b", 1) / 2;
                    int height = numVars.value("height", 1);
                    price += 10 * (width + height);
                }
            } else {
                int width = numVars.value("width", 1);
                int height = numVars.value("height", 1);
                price += 10 * (width + height);
            }
        }
        if (part["n"].get<std::string>().find("Capsule") != std::string::npos /*This just says if its not equal to no position*/) {
            price += 22; // cant be arsed with figuring out the price
        }

    }

    return price;
}
