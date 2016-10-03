BIN = css

all : $(BIN)

css :
	stylus private/styles/mutable.styl -o public/styles/mutable.css

.PHONY: All, Clean
