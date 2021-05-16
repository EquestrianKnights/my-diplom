# Звуки боли
Ебал я в рот всю эту хуйню с дипломом

## Рекомендуемое окружение

 - [Visual Studio Code](https://code.visualstudio.com)
 - Расширение [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)
 - [TeX Live](https://www.tug.org/texlive/)

### Установка

Для установки TeX Live рекомендуется выбирать *simple install (big)* режим установки. Установка занимает около часа, размер установленного дистрибутива составляет около 5 ГБ, зато все требуемые пакеты будут точно установлены.

При разработке на windows после установки TeX Live необходимо установить шрифты для русского языка PSCyr. Для этого нужно распаковать архив *pscyr.zip* из корня проекта в папку установленного Tex Live (по умолчанию это папка *c:\\texlive*). После этого нужно запустить скрипт *install_pscyr.bat*.

### Использование

При открытом *.tex* файле в VSCode в боковом меню появляется панель с командами LaTeX.


![latex panel](https://raw.githubusercontent.com/egorshulga/new-bsuir-diploma-latex/master/note/attachments/latex-panel.png)
