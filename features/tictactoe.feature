#language: ru
Функционал: Крестики нолики

  Сценарий: Ход игрока
    Дано пустое поле
    И ходит игрок 1
    Если игрок ходит в клетку 1, 1
    То поле становится "1,0,0|0,0,0|0,0,0"
    Если игрок ходит в клетку 2, 2
    То поле становится "1,0,0|0,2,0|0,0,0"
    Если игрок ходит в клетку 3, 3
    То поле становится "1,0,0|0,2,0|0,0,1"

  Сценарий: Ход игрока в заполненную клетку
    Дано поле "1,0,0|2,0,0|1,0,2"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 1
    То возвращается ошибка
    И поле становится "1,0,0|2,0,0|1,0,2"
    Если игрок ходит в клетку 1, 2
    То поле становится "1,1,0|2,0,0|1,0,2"

  Сценарий: определение победителя по вертикали
    Дано поле "1,0,2|1,2,0|0,0,2"
    И ходит игрок 1
    Если игрок ходит в клетку 3, 1
    То поле становится "1,0,2|1,2,0|1,0,2"
    И победил текущий игрок

  Сценарий: определение победителя по горизонтали
    Дано поле "1,1,0|0,0,2|0,0,2"
    И ходит игрок 1
    Если игрок ходит в клетку 1, 3
    То поле становится "1,1,1|0,0,2|0,0,2"
    И победил текущий игрок

  Сценарий: определение победителя по диагонали
    Дано поле "1,0,2|0,1,2|0,0,0"
    И ходит игрок 1
    Если игрок ходит в клетку 3, 3
    То поле становится "1,0,2|0,1,2|0,0,1"
    И победил текущий игрок

  Структура сценария: игра
    Дано поле <старт>
    И ходит игрок <игрок>
    Если игрок ходит в клетку <x>, <y>
    То поле становится <стало>
    И победил текущий игрок

Примеры:
| старт                 | игрок | x | y | стало                 |
| "1,0,2\|0,1,2\|0,0,0" | 1     | 3 | 3 | "1,0,2\|0,1,2\|0,0,1" |
| "1,1,0\|0,0,2\|0,0,2" | 2     | 1 | 3 | "1,1,2\|0,0,2\|0,0,2" |