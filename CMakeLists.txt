cmake_minimum_required(VERSION 3.20)

project(SFS1.6RPRocketPriceCalc)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Core Gui Widgets)
find_package(nlohmann_json)

add_executable(${PROJECT_NAME} main.cpp
    App.hpp
    App.cpp)

target_link_libraries(${PROJECT_NAME} PRIVATE Qt6::Core Qt6::Gui Qt6::Widgets nlohmann_json::nlohmann_json)