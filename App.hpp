#ifndef SFSROCKETPRICECALC_APP_HPP
#define SFSROCKETPRICECALC_APP_HPP

#include <QApplication>
#include <QMainWindow>
#include <QFileDialog>
#include <QPushButton>
#include <QLabel>

#include <nlohmann/json.hpp>

using json = nlohmann::json;

class App: public QMainWindow {
    Q_OBJECT
public:
    App();
    int calcPrice(json parts);
};

#endif // SFSROCKETPRICECALC_APP_HPP