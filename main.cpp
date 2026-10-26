#include <QApplication>
#include "App.hpp"

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    App win;
    win.show();
    return QApplication::exec();
}