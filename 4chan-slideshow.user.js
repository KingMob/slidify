// ==UserScript==
// @name			4chan-Slideshow
// @namespace		http://dial-a-davidson.net
// @description		Creates a slideshow of every image in the thread
// @include			http://boards.4chan.org/*/res/*
// @match			http://boards.4chan.org/*/res/*
// ==/UserScript==

// the guts of this userscript - all jQuery calls must be inside main
function jQmain() {
	var slideshow_initialized = false;
	var img_info;
	
	// Image data - sandboxing inhibits local file access
	var playpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM4MTc5NTQ3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM4MTc5NTU3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozREFCM0FFQjdEODExMUUwODExMUI1NjNBRTBEQTJDNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozREFCM0FFQzdEODExMUUwODExMUI1NjNBRTBEQTJDNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiDTdmcAAAKOSURBVHja7JhNTxNBGIDfTUhIU9OTJwyJVzVBT/4K/4EHD+IFLujRozEx8eDBRCC1BIwKFlpaS0ORGJGQqFjTVFrtsuyyFCqIhVIhQLu77fgObozxI9TutG7JbPJkd97dmczT+a5ACIGjdgmCQAQuxsW4GBfjYlyMi3GxuokBFWMBXk1IJ+JkVUELdWEqNnC5vZ04HA6auIm4jooY2cxtkXlpgXR0dBKn00mDt5DjDS/2eT37A3FeIl1dV4nL5aIvbyOt9RRjNnnQAbuSWfstvrOzDQP9/eB290I+n7+LoXuIVKnYf58VaWGKuvzX93t7uzA0OAi9Pd2Qy232YIiSaAixlKQc+l2hUAC/bxj6PPdhbXX1IYa6kTe2FptLihV/Xy6XYCwUQkE3LC2pw2YXnTkY+HYTexdLVJV3IjKO49ADsrwQMltw8ruXTcRezcYslTH9cgoeoKAops5jMmpFrInlVkbTNEv5T50+A21nz4GiyG91XW+mRVZbFlOxoqZXlW9jIwveocfwLBKGYrF4B0M3rEgxF9P0fxP7lFmB4OgIPJ+cAMMwHmGISqnIrtW6MO6KlYml0yoEfF6YmZ7KYnIc6UMyyBZd8uikaSsx/RCxxUUZAn4vRGdf0y1KGPEg68hXU8hgIVW3riimPkAoMALJxHvaKk/pSQD58osQ04NhTcWSc3EYC/pAkSUZkwHkiSm0jezXQqg2XVE3Du7xWBQi4SAsp9WPmPQjo0jWFCrUUsjy0eAPR4XYxUtXSMuJVpqII9eRNqQFOWb+iEIjHluu4e0CEkRe0OWJnlro8oaUqmkhu2ypTpqP+z8Jla10ObuINZsSJatCthLj/ytyMS7GxbgYF+Ni7MS+CTAAs5aAGPsbqywAAAAASUVORK5CYII=";
	var pausepng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM4MTc5NTg3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM4MTc5NTk3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQzgxNzk1NjdEOEYxMUUwODExMUI1NjNBRTBEQTJDNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQzgxNzk1NzdEOEYxMUUwODExMUI1NjNBRTBEQTJDNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuoETW0AAADfSURBVHja7JnBDcMgDEXtqtswQts1WajtCAwTg+QmPQfwwaqAfks+8Q9+fMeyAqsqrRbMrBdaNAAGMIABDGAAA9jqYPsqE491ppLRqnGpxXNXDCHo8/U+PXvcb5RSYovGY1e8ejp2XFLOpXpm1XiEMxg1irZrBgRTkpy7jvU0APslWJY+WE8zpmMGMBG04kiOicExmQ9sM7TiNl8rUqPN7BoMD4x7TMUKGDWKJjVrxmxFbPeTTcVS+o71NG7FeOUe8fupnGe0ahzqUMYz0j//pQIYwAAGMIABDGA+8RFgAFsPxgZJaDDDAAAAAElFTkSuQmCC";
	var buttontraydownpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjdFODMzREM1MEE0MTFFMEFEOTU5OUE1ODlDRDI0NDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjdFODMzREQ1MEE0MTFFMEFEOTU5OUE1ODlDRDI0NDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NDMwNzU1NzUwQTQxMUUwQUQ5NTk5QTU4OUNEMjQ0MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NDMwNzU1ODUwQTQxMUUwQUQ5NTk5QTU4OUNEMjQ0MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhV2HEoAAAJWSURBVHja7JhPaxNRFMVv0hKrKBQ3LeknyE5ciSS6dtUPUBEbaDfiSnBhUMyuthLddKHGQkrFtotgFwpagpD4JwtLNWAWInQRNOOkMHXamdRUJ55XXqBqS8bOTBnrvfCDF5I7vMM97747CRBRExGgfRZB2qfBwlgYC2NhLIyFsTAWtnfR6fQBgYB3YyZmWK4YW3E3rgQd4BA4Jz/bCUu4DhTBolz7Sph4VncoFFIHBs7+dfLCwhsqlUrHpThfCRPV6mo0GnORSKT//GDcdqKmaRSLnhTLL3614gGQTyav90djpync12crMZG4QqqqprBU3NyMo78GtrT7EOgBx8DlaOxU9O69ibb5Lwp5Gh6Kv8TyDFjbesb80u6/g1VQBVlsuDIz/ZAM09yR2vIyXbuaELn3wTe3GofbwkR3M8AnUAbPb6XGqFKpkGGY25K6OUqKUhVlnQUbfr7HRNW+giUwr+v64tiNEVoz6n9QLBZp7lH2rbAtWHezWl4Ia8pN1sAH8OD1q4KSyz37xYLaygrdTo2K36elfX/8C5OHJZtAy5L59J1xqqk1Ms36JlOZCVKqnyfxXcZtC3o9UglLatKST1Z1/d1kJk1mfZ3K5fc0//TxZpcHdbct+NsQ3aTd0ubCPgpOgAvgY3z4YrOnNyySLsk7r+1072RfXglr3W3ilhZjRTIYDIqEIXDEzizpZF9uXtA7DQAHwWE5HFuyaxrSrp69j3ktrHWOOySW7ICWnbPlRFgneR+WZIP2MPgN+r97g3ZyDrhiLIyFsTAWxsJY2PbxU4ABAAm6ttRV9+RxAAAAAElFTkSuQmCC";
	var buttontrayuppng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDQzMDc1NTU1MEE0MTFFMEFEOTU5OUE1ODlDRDI0NDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDQzMDc1NTY1MEE0MTFFMEFEOTU5OUE1ODlDRDI0NDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NDMwNzU1MzUwQTQxMUUwQUQ5NTk5QTU4OUNEMjQ0MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NDMwNzU1NDUwQTQxMUUwQUQ5NTk5QTU4OUNEMjQ0MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pk9XwK4AAAIuSURBVHja7JjNSxtBFMDffsU0CWugalFPTRQ8SEWrIPiVQA+K1SCJ6EEwtg1KBAWFVhSDnvxHPPVQ8P9oRQpexIMIlp48uZsNmqxvZBQ/wESzA2t8D35sYDPD/nbePOatBAA2hgQVFjJUaJAYiZEYiZEYiZGYC0MtdwJJEncaw6MerRiJORwSp7mSxNg+9iJroVDoAK8rXFJ4sH4MnksJL05Hon6/3/79Z9eOxxNs0FapxaOc5xIlxlblDRJGdjIbm/bR8Ym993ffDgaDbGBUpJjIVFSQamSp42Pn6Pj4JJhmFjyeKljPbLL7aZEpKQuc14e0a5qWXl3LgJXLgWGaV/RHotA/EEng/fWXJMZWwYPUIAszX1JQU1sHhmHeYWFxGXRdZ0vX9VLEFF4w5kPhpsHPsTicGdkHeH0BSH6dFZaSsoD5WMFoUVV1aTa9CFnLuknB+/T0ReBDW3sS///DzWLsrWs8Bb8PDceg7l39VcF4jKlkCqq8Xlb+W90qdp2C3+obGoc/DY6AmbWK4g/oEBubYOPnnUxJp8WCsiyvJian4eIiD5aVK4mu7l54H26ew/F9rmlb7on5FEWBXz+3nzzYxD2H8c/JfVHWJ+5b/Rg7D77lB11WwgNFXhw7fVjIKfIfOUT2kbwT/ZiTYiqviAF+1UrYM3kuZ3DOkYLbxK5bE/nW76LHQX4tcGynOmgn95jNKVAH7eaPOeWkC60YiZEYiZEYiZHYKxO7FGAA4NauLNvk2KcAAAAASUVORK5CYII=";
	var forwardpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkVBNENFNUM0RDBBMTFFMDhGOEQ4NTA1RTVDMDMwM0EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkVBNENFNUQ0RDBBMTFFMDhGOEQ4NTA1RTVDMDMwM0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRUE0Q0U1QTREMEExMUUwOEY4RDg1MDVFNUMwMzAzQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRUE0Q0U1QjREMEExMUUwOEY4RDg1MDVFNUMwMzAzQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrvXl8cAAAaqSURBVHja1Jl7TNNX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";
	var backpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkVBNENFNjA0RDBBMTFFMDhGOEQ4NTA1RTVDMDMwM0EiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkVBNENFNjE0RDBBMTFFMDhGOEQ4NTA1RTVDMDMwM0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCRUE0Q0U1RTREMEExMUUwOEY4RDg1MDVFNUMwMzAzQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCRUE0Q0U1RjREMEExMUUwOEY4RDg1MDVFNUMwMzAzQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv4q7AYAAAa5SURBVHja1Jl7TFNX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";

	// Set jQuery easing library
	jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
	
	// Sets up Supersized and default theme
	var supersized_setup = function(){
	/*

		Supersized - Fullscreen Slideshow jQuery Plugin
		Version : 3.2.6
		Site	: www.buildinternet.com/project/supersized

		Author	: Sam Dunn
		Company : One Mighty Roar (www.onemightyroar.com)
		License : MIT License / GPL License

	*/

		$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>');


	    $.supersized = function(options){

	    	/* Variables
			----------------------------*/
	    	var el = '#supersized',
	        	base = this;
	        // Access to jQuery and DOM versions of element
	        base.$el = $(el);
	        base.el = el;
	        vars = $.supersized.vars;
	        // Add a reverse reference to the DOM object
	        base.$el.data("supersized", base);
	        api = base.$el.data('supersized');

			base.init = function(){
	        	// Combine options and vars
	        	$.supersized.vars = $.extend($.supersized.vars, $.supersized.themeVars);
	        	$.supersized.vars.options = $.extend({},$.supersized.defaultOptions, $.supersized.themeOptions, options);
	            base.options = $.supersized.vars.options;

	            base._build();
	        };


	        /* Build Elements
			----------------------------*/
	        base._build = function(){
	        	// Add in slide markers
	        	var thisSlide = 0,
	        		slideSet = '',
					markers = '',
					markerContent,
					thumbMarkers = '',
					thumbImage;

				while(thisSlide <= base.options.slides.length-1){
					//Determine slide link content
					switch(base.options.slide_links){
						case 'num':
							markerContent = thisSlide;
							break;
						case 'name':
							markerContent = base.options.slides[thisSlide].title;
							break;
						case 'blank':
							markerContent = '';
							break;
					}

					slideSet = slideSet+'<li class="slide-'+thisSlide+'"></li>';

					if(thisSlide == base.options.start_slide-1){
						// Slide links
						if (base.options.slide_links)markers = markers+'<li class="slide-link-'+thisSlide+' current-slide"><a>'+markerContent+'</a></li>';
						// Slide Thumbnail Links
						if (base.options.thumb_links){
							base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
							thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+' current-thumb"><img src="'+thumbImage+'"/></li>';
						};
					}else{
						// Slide links
						if (base.options.slide_links) markers = markers+'<li class="slide-link-'+thisSlide+'" ><a>'+markerContent+'</a></li>';
						// Slide Thumbnail Links
						if (base.options.thumb_links){
							base.options.slides[thisSlide].thumb ? thumbImage = base.options.slides[thisSlide].thumb : thumbImage = base.options.slides[thisSlide].image;
							thumbMarkers = thumbMarkers+'<li class="thumb'+thisSlide+'"><img src="'+thumbImage+'"/></li>';
						};
					}
					thisSlide++;
				}

				if (base.options.slide_links) $(vars.slide_list).html(markers);
				if (base.options.thumb_links && vars.thumb_tray.length){
					$(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace('#','')+'">'+thumbMarkers+'</ul>');
				}

				$(base.el).append(slideSet);

				// Add in thumbnails
				if (base.options.thumbnail_navigation){
					// Load previous thumbnail
					vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
					$(vars.prev_thumb).show().html($("<img/>").attr("src", base.options.slides[prevThumb].image));

					// Load next thumbnail
					vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
					$(vars.next_thumb).show().html($("<img/>").attr("src", base.options.slides[nextThumb].image));
				}

	            base._start(); // Get things started
	        };


	        /* Initialize
			----------------------------*/
	    	base._start = function(){

				// Determine if starting slide random
				if (base.options.start_slide){
					vars.current_slide = base.options.start_slide - 1;
				}else{
					vars.current_slide = Math.floor(Math.random()*base.options.slides.length);	// Generate random slide number
				}

				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';

				// Set slideshow quality (Supported only in FF and IE, no Webkit)
				if (base.options.performance == 3){
					base.$el.addClass('speed'); 		// Faster transitions
				} else if ((base.options.performance == 1) || (base.options.performance == 2)){
					base.$el.addClass('quality');	// Higher image quality
				}

				// Shuffle slide order if needed		
				if (base.options.random){
					arr = base.options.slides;
					for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);	// Fisher-Yates shuffle algorithm (jsfromhell.com/array/shuffle)
				    base.options.slides = arr;
				}

				/*-----Load initial set of images-----*/

				if (base.options.slides.length > 1){
					if(base.options.slides.length > 2){
						// Set previous image
						vars.current_slide - 1 < 0  ? loadPrev = base.options.slides.length - 1 : loadPrev = vars.current_slide - 1;	// If slide is 1, load last slide as previous
						var imageLink = (base.options.slides[loadPrev].url) ? "href='" + base.options.slides[loadPrev].url + "'" : "";

						var imgPrev = $('<img src="'+base.options.slides[loadPrev].image+'"/>');
						var slidePrev = base.el+' li:eq('+loadPrev+')';
						imgPrev.appendTo(slidePrev).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading prevslide');

						imgPrev.load(function(){
							$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
							base.resizeNow();	// Resize background image
						});	// End Load
					}
				} else {
					// Slideshow turned off if there is only one slide
					base.options.slideshow = 0;
				}

				// Set current image
				imageLink = (api.getField('url')) ? "href='" + api.getField('url') + "'" : "";
				var img = $('<img src="'+api.getField('image')+'"/>');

				var slideCurrent= base.el+' li:eq('+vars.current_slide+')';
				img.appendTo(slideCurrent).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading activeslide');

				img.load(function(){
					base._origDim($(this));
					base.resizeNow();	// Resize background image
					base.launch();
					if( typeof theme != 'undefined' && typeof theme._init == "function" ) theme._init();	// Load Theme
				});

				if (base.options.slides.length > 1){
					// Set next image
					vars.current_slide == base.options.slides.length - 1 ? loadNext = 0 : loadNext = vars.current_slide + 1;	// If slide is last, load first slide as next
					imageLink = (base.options.slides[loadNext].url) ? "href='" + base.options.slides[loadNext].url + "'" : "";

					var imgNext = $('<img src="'+base.options.slides[loadNext].image+'"/>');
					var slideNext = base.el+' li:eq('+loadNext+')';
					imgNext.appendTo(slideNext).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading');

					imgNext.load(function(){
						$(this).data('origWidth', $(this).width()).data('origHeight', $(this).height());
						base.resizeNow();	// Resize background image
					});	// End Load
				}
				/*-----End load initial images-----*/

				//  Hide elements to be faded in
				base.$el.css('visibility','hidden');
				$('.load-item').hide();

	    	};


			/* Launch Supersized
			----------------------------*/
			base.launch = function(){

				base.$el.css('visibility','visible');
				$('#supersized-loader').remove();		//Hide loading animation

				// Call theme function for before slide transition
				if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');
				$('.load-item').show();

				// Keyboard Navigation
				if (base.options.keyboard_nav){
					$(document.documentElement).keyup(function (event) {

						if(vars.in_animation) return false;		// Abort if currently animating

						// Left Arrow, Down Arrow, Z, or z
						if ((event.keyCode == 37) || (event.keyCode == 40) || (event.keyCode == 122) || (event.keyCode == 90)) {
							clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
							base.prevSlide();

						// Right Arrow, Up Arrow, X, or x
						} else if ((event.keyCode == 39) || (event.keyCode == 38) || (event.keyCode == 120) || (event.keyCode == 88)) {
							clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
							base.nextSlide();

						// Spacebar	
						} else if (event.keyCode == 32 && !vars.hover_pause) {
							clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup
							base.playToggle();
						}

					});
				}

				// Pause when hover on image
				if (base.options.slideshow && base.options.pause_hover){
					$(base.el).hover(function() {
						if(vars.in_animation) return false;		// Abort if currently animating
				   			vars.hover_pause = true;	// Mark slideshow paused from hover
				   			if(!vars.is_paused){
				   				vars.hover_pause = 'resume';	// It needs to resume afterwards
				   				base.playToggle();
				   			}
				   	}, function() {
						if(vars.hover_pause == 'resume'){
							base.playToggle();
							vars.hover_pause = false;
						}
				   	});
				}

				if (base.options.slide_links){
					// Slide marker clicked
					$(vars.slide_list+'> li').click(function(){

						index = $(vars.slide_list+'> li').index(this);
						targetSlide = index + 1;

						base.goTo(targetSlide);
						return false;

					});
				}

				// Thumb marker clicked
				if (base.options.thumb_links){
					$(vars.thumb_list+'> li').click(function(){

						index = $(vars.thumb_list+'> li').index(this);
						targetSlide = index + 1;

						api.goTo(targetSlide);
						return false;

					});
				}

				// Start slideshow if enabled
				if (base.options.slideshow && base.options.slides.length > 1){

		    		// Start slideshow if autoplay enabled
		    		if (base.options.autoplay && base.options.slides.length > 1){
		    			vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);	// Initiate slide interval
					}else{
						vars.is_paused = true;	// Mark as paused
					}

					//Prevent navigation items from being dragged					
					$('.load-item img').bind("contextmenu mousedown",function(){
						return false;
					});

				}

				// Adjust image when browser is resized
				$(window).resize(function(){
		    		base.resizeNow();
				});

	    	};


	        /* Resize Images
			----------------------------*/
			base.resizeNow = function(){

				return base.$el.each(function() {
			  		//  Resize each image seperately
			  		$('img', base.el).each(function(){

						thisSlide = $(this);
						var ratio = (thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);	// Define image ratio

						// Gather browser size
						var browserwidth = base.$el.width(),
							browserheight = base.$el.height(),
							offset;

						/*-----Resize Image-----*/
						if (base.options.fit_always){	// Fit always is enabled
							if ((browserheight/browserwidth) > ratio){
								resizeWidth();
							} else {
								resizeHeight();
							}
						}else{	// Normal Resize
							if ((browserheight <= base.options.min_height) && (browserwidth <= base.options.min_width)){	// If window smaller than minimum width and height

								if ((browserheight/browserwidth) > ratio){
									base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight(true);	// If landscapes are set to fit
								} else {
									base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth(true);		// If portraits are set to fit
								}

							} else if (browserwidth <= base.options.min_width){		// If window only smaller than minimum width

								if ((browserheight/browserwidth) > ratio){
									base.options.fit_landscape && ratio < 1 ? resizeWidth(true) : resizeHeight();	// If landscapes are set to fit
								} else {
									base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth(true);		// If portraits are set to fit
								}

							} else if (browserheight <= base.options.min_height){	// If window only smaller than minimum height

								if ((browserheight/browserwidth) > ratio){
									base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight(true);	// If landscapes are set to fit
								} else {
									base.options.fit_portrait && ratio >= 1 ? resizeHeight(true) : resizeWidth();		// If portraits are set to fit
								}

							} else {	// If larger than minimums

								if ((browserheight/browserwidth) > ratio){
									base.options.fit_landscape && ratio < 1 ? resizeWidth() : resizeHeight();	// If landscapes are set to fit
								} else {
									base.options.fit_portrait && ratio >= 1 ? resizeHeight() : resizeWidth();		// If portraits are set to fit
								}

							}
						}
						/*-----End Image Resize-----*/


						/*-----Resize Functions-----*/

						function resizeWidth(minimum){
							if (minimum){	// If minimum height needs to be considered
								if(thisSlide.width() < browserwidth || thisSlide.width() < base.options.min_width ){
									if (thisSlide.width() * ratio >= base.options.min_height){
										thisSlide.width(base.options.min_width);
							    		thisSlide.height(thisSlide.width() * ratio);
							    	}else{
							    		resizeHeight();
							    	}
							    }
							}else{
								if (base.options.min_height >= browserheight && !base.options.fit_landscape){	// If minimum height needs to be considered
									if (browserwidth * ratio >= base.options.min_height || (browserwidth * ratio >= base.options.min_height && ratio <= 1)){	// If resizing would push below minimum height or image is a landscape
										thisSlide.width(browserwidth);
										thisSlide.height(browserwidth * ratio);
									} else if (ratio > 1){		// Else the image is portrait
										thisSlide.height(base.options.min_height);
										thisSlide.width(thisSlide.height() / ratio);
									} else if (thisSlide.width() < browserwidth) {
										thisSlide.width(browserwidth);
							    		thisSlide.height(thisSlide.width() * ratio);
									}
								}else{	// Otherwise, resize as normal
									thisSlide.width(browserwidth);
									thisSlide.height(browserwidth * ratio);
								}
							}
						};

						function resizeHeight(minimum){
							if (minimum){	// If minimum height needs to be considered
								if(thisSlide.height() < browserheight){
									if (thisSlide.height() / ratio >= base.options.min_width){
										thisSlide.height(base.options.min_height);
										thisSlide.width(thisSlide.height() / ratio);
									}else{
										resizeWidth(true);
									}
								}
							}else{	// Otherwise, resized as normal
								if (base.options.min_width >= browserwidth){	// If minimum width needs to be considered
									if (browserheight / ratio >= base.options.min_width || ratio > 1){	// If resizing would push below minimum width or image is a portrait
										thisSlide.height(browserheight);
										thisSlide.width(browserheight / ratio);
									} else if (ratio <= 1){		// Else the image is landscape
										thisSlide.width(base.options.min_width);
							    		thisSlide.height(thisSlide.width() * ratio);
									}
								}else{	// Otherwise, resize as normal
									thisSlide.height(browserheight);
									thisSlide.width(browserheight / ratio);
								}
							}
						};

						/*-----End Resize Functions-----*/

						if (thisSlide.parents('li').hasClass('image-loading')){
							$('.image-loading').removeClass('image-loading');
						}

						// Horizontally Center
						if (base.options.horizontal_center){
							$(this).css('left', (browserwidth - $(this).width())/2);
						}

						// Vertically Center
						if (base.options.vertical_center){
							$(this).css('top', (browserheight - $(this).height())/2);
						}

					});

					// Basic image drag and right click protection
					if (base.options.image_protect){

						$('img', base.el).bind("contextmenu mousedown",function(){
							return false;
						});

					}

					return false;

				});

			};


	        /* Next Slide
			----------------------------*/
			base.nextSlide = function(){

				if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
					else vars.in_animation = true;		// Otherwise set animation marker

			    clearInterval(vars.slideshow_interval);	// Stop slideshow

			    var slides = base.options.slides,					// Pull in slides array
					liveslide = base.$el.find('.activeslide');		// Find active slide
					$('.prevslide').removeClass('prevslide');
					liveslide.removeClass('activeslide').addClass('prevslide');	// Remove active class & update previous slide

				// Get the slide number of new slide
				vars.current_slide + 1 == base.options.slides.length ? vars.current_slide = 0 : vars.current_slide++;

			    var nextslide = $(base.el+' li:eq('+vars.current_slide+')'),
			    	prevslide = base.$el.find('.prevslide');

				// If hybrid mode is on drop quality for transition
				if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');	


				/*-----Load Image-----*/

				loadSlide = false;

				vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

				var targetList = base.el+' li:eq('+loadSlide+')';
				if (!$(targetList).html()){

					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';

					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 

					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');

					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};

				// Update thumbnails (if enabled)
				if (base.options.thumbnail_navigation == 1){

					// Load previous thumbnail
					vars.current_slide - 1 < 0  ? prevThumb = base.options.slides.length - 1 : prevThumb = vars.current_slide - 1;
					$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

					// Load next thumbnail
					nextThumb = loadSlide;
					$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));

				}



				/*-----End Load Image-----*/


				// Call theme function for before slide transition
				if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('next');

				//Update slide markers
				if (base.options.slide_links){
					$('.current-slide').removeClass('current-slide');
					$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
				}

			    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide

		    	switch(base.options.transition){
		    		case 0: case 'none':	// No transition
		    		    nextslide.css('visibility','visible');
		    		    vars.in_animation = false;
		    		    break;
		    		case 1: case 'fade':	// Fade
		    		    nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
		    		    break;
		    		case 2: case 'slideTop':	// Slide Top
		    		    nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    		    break;
		    		case 3: case 'slideRight':	// Slide Right
		    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 4: case 'slideBottom': // Slide Bottom
		    			nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 5: case 'slideLeft':  // Slide Left
		    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 6: case 'carouselRight':	// Carousel Right
		    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						liveslide.animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
		    			break;
		    		case 7: case 'carouselLeft':   // Carousel Left
		    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						liveslide.animate({ left: base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
		    			break;
		    	}
			    return false;	
			};


			/* Previous Slide
			----------------------------*/
			base.prevSlide = function(){

				if(vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating
					else vars.in_animation = true;		// Otherwise set animation marker

				clearInterval(vars.slideshow_interval);	// Stop slideshow

				var slides = base.options.slides,					// Pull in slides array
					liveslide = base.$el.find('.activeslide');		// Find active slide
					$('.prevslide').removeClass('prevslide');
					liveslide.removeClass('activeslide').addClass('prevslide');		// Remove active class & update previous slide

				// Get current slide number
				vars.current_slide == 0 ?  vars.current_slide = base.options.slides.length - 1 : vars.current_slide-- ;

			    var nextslide =  $(base.el+' li:eq('+vars.current_slide+')'),
			    	prevslide =  base.$el.find('.prevslide');

				// If hybrid mode is on drop quality for transition
				if (base.options.performance == 1) base.$el.removeClass('quality').addClass('speed');	


				/*-----Load Image-----*/

				loadSlide = vars.current_slide;

				var targetList = base.el+' li:eq('+loadSlide+')';
				if (!$(targetList).html()){
					// If links should open in new window
					var linkTarget = base.options.new_window ? ' target="_blank"' : '';
					imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
					var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 

					img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');

					img.load(function(){
						base._origDim($(this));
						base.resizeNow();
					});	// End Load
				};

				// Update thumbnails (if enabled)
				if (base.options.thumbnail_navigation == 1){

					// Load previous thumbnail
					prevThumb = loadSlide;
					$(vars.prev_thumb).html($("<img/>").attr("src", base.options.slides[prevThumb].image));

					// Load next thumbnail
					vars.current_slide == base.options.slides.length - 1 ? nextThumb = 0 : nextThumb = vars.current_slide + 1;
					$(vars.next_thumb).html($("<img/>").attr("src", base.options.slides[nextThumb].image));
				}

				/*-----End Load Image-----*/


				// Call theme function for before slide transition
				if( typeof theme != 'undefined' && typeof theme.beforeAnimation == "function" ) theme.beforeAnimation('prev');

				//Update slide markers
				if (base.options.slide_links){
					$('.current-slide').removeClass('current-slide');
					$(vars.slide_list +'> li' ).eq(vars.current_slide).addClass('current-slide');
				}

			    nextslide.css('visibility','hidden').addClass('activeslide');	// Update active slide

			    switch(base.options.transition){
		    		case 0: case 'none':	// No transition
		    		    nextslide.css('visibility','visible'); vars.in_animation = false; base.afterAnimation();
		    		    break;
		    		case 1: case 'fade':	// Fade
		    		  	nextslide.animate({opacity : 0},0).css('visibility','visible').animate({opacity : 1, avoidTransforms : false}, base.options.transition_speed, function(){ base.afterAnimation(); });
		    		    break;
		    		case 2: case 'slideTop':	// Slide Top (reverse)
		    		    nextslide.animate({top : base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    		    break;
		    		case 3: case 'slideRight':	// Slide Right (reverse)
		    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 4: case 'slideBottom': // Slide Bottom (reverse)
		    			nextslide.animate({top : -base.$el.height()}, 0 ).css('visibility','visible').animate({ top:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 5: case 'slideLeft':  // Slide Left (reverse)
		    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
		    			break;
		    		case 6: case 'carouselRight':	// Carousel Right (reverse)
		    			nextslide.animate({left : -base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						liveslide.animate({left : 0}, 0 ).animate({ left: base.$el.width(), avoidTransforms : false}, base.options.transition_speed );
		    			break;
		    		case 7: case 'carouselLeft':   // Carousel Left (reverse)
		    			nextslide.animate({left : base.$el.width()}, 0 ).css('visibility','visible').animate({ left:0, avoidTransforms : false }, base.options.transition_speed, function(){ base.afterAnimation(); });
						liveslide.animate({left : 0}, 0 ).animate({ left: -base.$el.width(), avoidTransforms : false }, base.options.transition_speed );
		    			break;
		    	}
			    return false;	
			};


			/* Play/Pause Toggle
			----------------------------*/
			base.playToggle = function(){

				if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

				if (vars.is_paused){

					vars.is_paused = false;

					// Call theme function for play
					if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('play');

					// Resume slideshow
		        	vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);

	        	}else{

	        		vars.is_paused = true;

	        		// Call theme function for pause
	        		if( typeof theme != 'undefined' && typeof theme.playToggle == "function" ) theme.playToggle('pause');

	        		// Stop slideshow
	        		clearInterval(vars.slideshow_interval);	

	       		}

			    return false;

	    	};


	    	/* Go to specific slide
			----------------------------*/
	    	base.goTo = function(targetSlide){
				if (vars.in_animation || !api.options.slideshow) return false;		// Abort if currently animating

				var totalSlides = base.options.slides.length;

				// If target outside range
				if(targetSlide < 0){
					targetSlide = totalSlides;
				}else if(targetSlide > totalSlides){
					targetSlide = 1;
				}
				targetSlide = totalSlides - targetSlide + 1;

				clearInterval(vars.slideshow_interval);	// Stop slideshow, prevent buildup

				// Call theme function for goTo trigger
				if (typeof theme != 'undefined' && typeof theme.goTo == "function" ) theme.goTo();

				if (vars.current_slide == totalSlides - targetSlide){
					if(!(vars.is_paused)){
						vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
					} 
					return false;
				}

				// If ahead of current position
				if(totalSlides - targetSlide > vars.current_slide ){

					// Adjust for new next slide
					vars.current_slide = totalSlides-targetSlide-1;
					vars.update_images = 'next';
					base._placeSlide(vars.update_images);

				//Otherwise it's before current position
				}else if(totalSlides - targetSlide < vars.current_slide){

					// Adjust for new prev slide
					vars.current_slide = totalSlides-targetSlide+1;
					vars.update_images = 'prev';
				    base._placeSlide(vars.update_images);

				}

				// set active markers
				if (base.options.slide_links){
					$(vars.slide_list +'> .current-slide').removeClass('current-slide');
					$(vars.slide_list +'> li').eq((totalSlides-targetSlide)).addClass('current-slide');
				}

				if (base.options.thumb_links){
					$(vars.thumb_list +'> .current-thumb').removeClass('current-thumb');
					$(vars.thumb_list +'> li').eq((totalSlides-targetSlide)).addClass('current-thumb');
				}

			};


	        /* Place Slide
			----------------------------*/
	        base._placeSlide = function(place){

				// If links should open in new window
				var linkTarget = base.options.new_window ? ' target="_blank"' : '';

				loadSlide = false;

				if (place == 'next'){

					vars.current_slide == base.options.slides.length - 1 ? loadSlide = 0 : loadSlide = vars.current_slide + 1;	// Determine next slide

					var targetList = base.el+' li:eq('+loadSlide+')';

					if (!$(targetList).html()){
						// If links should open in new window
						var linkTarget = base.options.new_window ? ' target="_blank"' : '';

						imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
						var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 

						img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');

						img.load(function(){
							base._origDim($(this));
							base.resizeNow();
						});	// End Load
					};

					base.nextSlide();

				}else if (place == 'prev'){

					vars.current_slide - 1 < 0  ? loadSlide = base.options.slides.length - 1 : loadSlide = vars.current_slide - 1;	// Determine next slide

					var targetList = base.el+' li:eq('+loadSlide+')';

					if (!$(targetList).html()){
						// If links should open in new window
						var linkTarget = base.options.new_window ? ' target="_blank"' : '';

						imageLink = (base.options.slides[loadSlide].url) ? "href='" + base.options.slides[loadSlide].url + "'" : "";	// If link exists, build it
						var img = $('<img src="'+base.options.slides[loadSlide].image+'"/>'); 

						img.appendTo(targetList).wrap('<a ' + imageLink + linkTarget + '></a>').parent().parent().addClass('image-loading').css('visibility','hidden');

						img.load(function(){
							base._origDim($(this));
							base.resizeNow();
						});	// End Load
					};
					base.prevSlide();
				}

			};


			/* Get Original Dimensions
			----------------------------*/
			base._origDim = function(targetSlide){
				targetSlide.data('origWidth', targetSlide.width()).data('origHeight', targetSlide.height());
			};


			/* After Slide Animation
			----------------------------*/
			base.afterAnimation = function(){

				// If hybrid mode is on swap back to higher image quality
				if (base.options.performance == 1){
			    	base.$el.removeClass('speed').addClass('quality');
				}

				// Update previous slide
				if (vars.update_images){
					vars.current_slide - 1 < 0  ? setPrev = base.options.slides.length - 1 : setPrev = vars.current_slide-1;
					vars.update_images = false;
					$('.prevslide').removeClass('prevslide');
					$(base.el+' li:eq('+setPrev+')').addClass('prevslide');
				}

				vars.in_animation = false;

				// Resume slideshow
				if (!vars.is_paused && base.options.slideshow){
					vars.slideshow_interval = setInterval(base.nextSlide, base.options.slide_interval);
					if (base.options.stop_loop && vars.current_slide == base.options.slides.length - 1 ) base.playToggle();
				}

				// Call theme function for after slide transition
				if (typeof theme != 'undefined' && typeof theme.afterAnimation == "function" ) theme.afterAnimation();

				return false;

			};

			base.getField = function(field){
				return base.options.slides[vars.current_slide][field];
			};

	        // Make it go!
	        base.init();
		};


		/* Global Variables
		----------------------------*/
		$.supersized.vars = {

			// Elements							
			thumb_tray			:	'#thumb-tray',	// Thumbnail tray
			thumb_list			:	'#thumb-list',	// Thumbnail list
			slide_list          :   '#slide-list',	// Slide link list

			// Internal variables
			current_slide			:	0,			// Current slide number
			in_animation 			:	false,		// Prevents animations from stacking
			is_paused 				: 	false,		// Tracks paused on/off
			hover_pause				:	false,		// If slideshow is paused from hover
			slideshow_interval		:	false,		// Stores slideshow timer					
			update_images 			: 	false,		// Trigger to update images after slide jump
			options					:	{}			// Stores assembled options list

		};


		/* Default Options
		----------------------------*/
		$.supersized.defaultOptions = {

	    	// Functionality
			slideshow               :   1,			// Slideshow on/off
			autoplay				:	0,			// Slideshow starts playing automatically
			start_slide             :   1,			// Start slide (0 is random)
			stop_loop				:	0,			// Stops slideshow on last slide
			random					: 	0,			// Randomize slide order (Ignores start slide)
			slide_interval          :   6000,		// Length between transitions
			transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	500,		// Speed of transition
			new_window				:	1,			// Image links open in new window/tab
			pause_hover             :   0,			// Pause slideshow on hover
			keyboard_nav            :   1,			// Keyboard navigation on/off
			performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed //  (Only works for Firefox/IE, not Webkit)
			image_protect			:	0,			// Disables image dragging and right click with Javascript

			// Size & Position
			fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
			fit_landscape			:   0,			// Landscape images will not exceed browser width
			fit_portrait         	:   1,			// Portrait images will not exceed browser height  			   
			min_width		        :   0,			// Min width allowed (in pixels)
			min_height		        :   0,			// Min height allowed (in pixels)
			horizontal_center       :   1,			// Horizontally center background
			vertical_center         :   1,			// Vertically center background


			// Components							
			slide_links				:	0,			// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			thumb_links				:	0,			// Individual thumb links for each slide
			thumbnail_navigation    :   0			// Thumbnail navigation

	    };

	    $.fn.supersized = function(options){
	        return this.each(function(){
	            (new $.supersized(options));
	        });
	    };


		/*

			Supersized - Fullscreen Slideshow jQuery Plugin
			Version : 3.2.6
			Theme 	: Shutter 1.1

			Site	: www.buildinternet.com/project/supersized
			Author	: Sam Dunn
			Company : One Mighty Roar (www.onemightyroar.com)
			License : MIT License / GPL License

		*/

		theme = {


		 	/* Initial Placement
			----------------------------*/
		 	_init : function(){

		 		// Center Slide Links
		 		if (api.options.slide_links) $(vars.slide_list).css('margin-left', -$(vars.slide_list).width()/2);

				// Start progressbar if autoplay enabled
	    		if (api.options.autoplay){
	    			if (api.options.progress_bar) theme.progressBar();
				}else{
					if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", playpng);	// If pause play button is image, swap src
					if (api.options.progress_bar) $(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );	//  Place progress bar
				}


				/* Thumbnail Tray
				----------------------------*/
				// Hide tray off screen
				$(vars.thumb_tray).animate({bottom : -$(vars.thumb_tray).height()}, 0 );

				// Thumbnail Tray Toggle
				$(vars.tray_button).toggle(function(){
					$(vars.thumb_tray).stop().animate({bottom : 0, avoidTransforms : true}, 300 );
					if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", buttontraydownpng);
					return false;
				}, function() {
					$(vars.thumb_tray).stop().animate({bottom : -$(vars.thumb_tray).height(), avoidTransforms : true}, 300 );
					if ($(vars.tray_arrow).attr('src')) $(vars.tray_arrow).attr("src", buttontrayuppng);
					return false;
				});

				// Make thumb tray proper size
				$(vars.thumb_list).width($('> li', vars.thumb_list).length * $('> li', vars.thumb_list).outerWidth(true));	//Adjust to true width of thumb markers

				// Display total slides
				if ($(vars.slide_total).length){
					$(vars.slide_total).html(api.options.slides.length);
				}


				/* Thumbnail Tray Navigation
				----------------------------*/	
				if (api.options.thumb_links){
					//Hide thumb arrows if not needed
					if ($(vars.thumb_list).width() <= $(vars.thumb_tray).width()){
						$(vars.thumb_back +','+vars.thumb_forward).fadeOut(0);
					}

					// Thumb Intervals
	        		vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);
	        		vars.thumb_page = 0;

	        		// Cycle thumbs forward
	        		$(vars.thumb_forward).click(function(){
	        			if (vars.thumb_page - vars.thumb_interval <= -$(vars.thumb_list).width()){
	        				vars.thumb_page = 0;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
	        			}else{
	        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
	        			}
	        		});

	        		// Cycle thumbs backwards
	        		$(vars.thumb_back).click(function(){
	        			if (vars.thumb_page + vars.thumb_interval > 0){
	        				vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
	        				if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
						}else{
	        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
	        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
	        			}
	        		});

				}


				/* Navigation Items
				----------------------------*/
			    $(vars.next_slide).click(function() {
			    	api.nextSlide();
			    });

			    $(vars.prev_slide).click(function() {
			    	api.prevSlide();
			    });

			    	// Full Opacity on Hover
			    	if(jQuery.support.opacity){
				    	$(vars.prev_slide +','+vars.next_slide).mouseover(function() {
						   $(this).stop().animate({opacity:1},100);
						}).mouseout(function(){
						   $(this).stop().animate({opacity:0.6},100);
						});
					}

				if (api.options.thumbnail_navigation){
					// Next thumbnail clicked
					$(vars.next_thumb).click(function() {
				    	api.nextSlide();
				    });
				    // Previous thumbnail clicked
				    $(vars.prev_thumb).click(function() {
				    	api.prevSlide();
				    });
				}

			    $(vars.play_button).click(function() {
					api.playToggle();						    
			    });


				/* Thumbnail Mouse Scrub
				----------------------------*/
	    		if (api.options.mouse_scrub){
					$(vars.thumb_tray).mousemove(function(e) {
						var containerWidth = $(vars.thumb_tray).width(),
							listWidth = $(vars.thumb_list).width();
						if (listWidth > containerWidth){
							var mousePos = 1,
								diff = e.pageX - mousePos;
							if (diff > 10 || diff < -10) { 
							    mousePos = e.pageX; 
							    newX = (containerWidth - listWidth) * (e.pageX/containerWidth);
							    diff = parseInt(Math.abs(parseInt($(vars.thumb_list).css('left'))-newX )).toFixed(0);
							    $(vars.thumb_list).stop().animate({'left':newX}, {duration:diff*3, easing:'easeOutExpo'});
							}
						}
					});
				}


				/* Window Resize
				----------------------------*/
				$(window).resize(function(){

					// Delay progress bar on resize
					if (api.options.progress_bar && !vars.in_animation){
						if (vars.slideshow_interval) clearInterval(vars.slideshow_interval);
						if (api.options.slides.length - 1 > 0) clearInterval(vars.slideshow_interval);

						$(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );

						if (!vars.progressDelay && api.options.slideshow){
							// Delay slideshow from resuming so Chrome can refocus images
							vars.progressDelay = setTimeout(function() {
									if (!vars.is_paused){
										theme.progressBar();
										vars.slideshow_interval = setInterval(api.nextSlide, api.options.slide_interval);
									}
									vars.progressDelay = false;
							}, 1000);
						}
					}

					// Thumb Links
					if (api.options.thumb_links && vars.thumb_tray.length){
						// Update Thumb Interval & Page
						vars.thumb_page = 0;	
						vars.thumb_interval = Math.floor($(vars.thumb_tray).width() / $('> li', vars.thumb_list).outerWidth(true)) * $('> li', vars.thumb_list).outerWidth(true);

						// Adjust thumbnail markers
						if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
							$(vars.thumb_back +','+vars.thumb_forward).fadeIn('fast');
							$(vars.thumb_list).stop().animate({'left':0}, 200);
						}else{
							$(vars.thumb_back +','+vars.thumb_forward).fadeOut('fast');
						}

					}
				});	


		 	},


		 	/* Go To Slide
			----------------------------*/
		 	goTo : function(){
		 		if (api.options.progress_bar && !vars.is_paused){
					$(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );
					theme.progressBar();
				}
			},

		 	/* Play & Pause Toggle
			----------------------------*/
		 	playToggle : function(state){

		 		if (state =='play'){
		 			// If image, swap to pause
		 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", pausepng);
					if (api.options.progress_bar && !vars.is_paused) theme.progressBar();
		 		}else if (state == 'pause'){
		 			// If image, swap to play
		 			if ($(vars.play_button).attr('src')) $(vars.play_button).attr("src", playpng);
	        		if (api.options.progress_bar && vars.is_paused)$(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );
		 		}

		 	},


		 	/* Before Slide Transition
			----------------------------*/
		 	beforeAnimation : function(direction){
			    if (api.options.progress_bar && !vars.is_paused) $(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 );

			  	/* Update Fields
			  	----------------------------*/
			  	// Update slide caption
			   	if ($(vars.slide_caption).length){
			   		(api.getField('title')) ? $(vars.slide_caption).html(api.getField('title')) : $(vars.slide_caption).html('');
			   	}
			    // Update slide number
				if (vars.slide_current.length){
				    $(vars.slide_current).html(vars.current_slide + 1);
				}


			    // Highlight current thumbnail and adjust row position
			    if (api.options.thumb_links){

					$('.current-thumb').removeClass('current-thumb');
					$('li', vars.thumb_list).eq(vars.current_slide).addClass('current-thumb');

					// If thumb out of view
					if ($(vars.thumb_list).width() > $(vars.thumb_tray).width()){
						// If next slide direction
						if (direction == 'next'){
							if (vars.current_slide == 0){
								vars.thumb_page = 0;
								$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
							} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left >= vars.thumb_interval){
		        				vars.thumb_page = vars.thumb_page - vars.thumb_interval;
		        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
							}
						// If previous slide direction
						}else if(direction == 'prev'){
							if (vars.current_slide == api.options.slides.length - 1){
								vars.thumb_page = Math.floor($(vars.thumb_list).width() / vars.thumb_interval) * -vars.thumb_interval;
								if ($(vars.thumb_list).width() <= -vars.thumb_page) vars.thumb_page = vars.thumb_page + vars.thumb_interval;
								$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
							} else if ($('.current-thumb').offset().left - $(vars.thumb_tray).offset().left < 0){
								if (vars.thumb_page + vars.thumb_interval > 0) return false;
		        				vars.thumb_page = vars.thumb_page + vars.thumb_interval;
		        				$(vars.thumb_list).stop().animate({'left': vars.thumb_page}, {duration:500, easing:'easeOutExpo'});
							}
						}
					}


				}

		 	},


		 	/* After Slide Transition
			----------------------------*/
		 	afterAnimation : function(){
		 		if (api.options.progress_bar && !vars.is_paused) theme.progressBar();	//  Start progress bar
		 	},


		 	/* Progress Bar
			----------------------------*/
			progressBar : function(){
	    		$(vars.progress_bar).stop().animate({left : -$(window).width()}, 0 ).animate({ left:0 }, api.options.slide_interval);
	    	}

		 };


		 /* Theme Specific Variables
		 ----------------------------*/
		 $.supersized.themeVars = {

		 	// Internal Variables
			progress_delay		:	false,				// Delay after resize before resuming slideshow
			thumb_page 			: 	false,				// Thumbnail page
			thumb_interval 		: 	false,				// Thumbnail interval
			image_path			:	'img/',				// Default image path

			// General Elements							
			play_button			:	'#pauseplay',		// Play/Pause button
			next_slide			:	'#nextslide',		// Next slide button
			prev_slide			:	'#prevslide',		// Prev slide button
			next_thumb			:	'#nextthumb',		// Next slide thumb button
			prev_thumb			:	'#prevthumb',		// Prev slide thumb button

			slide_caption		:	'#slidecaption',	// Slide caption
			slide_current		:	'.slidenumber',		// Current slide number
			slide_total			:	'.totalslides',		// Total Slides
			slide_list			:	'#slide-list',		// Slide jump list							

			thumb_tray			:	'#thumb-tray',		// Thumbnail tray
			thumb_list			:	'#thumb-list',		// Thumbnail list
			thumb_forward		:	'#thumb-forward',	// Cycles forward through thumbnail list
			thumb_back			:	'#thumb-back',		// Cycles backwards through thumbnail list
			tray_arrow			:	'#tray-arrow',		// Thumbnail tray button arrow
			tray_button			:	'#tray-button',		// Thumbnail tray button

			progress_bar		:	'#progress-bar'		// Progress bar

		 };												

		 /* Theme Specific Options
		 ----------------------------*/												
		 $.supersized.themeOptions = {					

			progress_bar		:	0,		// Timer for each slide											
			mouse_scrub			:	1		// Thumbnails move with mouse

		 };	
	};

	
	var setup_control_html = function() {
		// Create control HTML and insert
		var slideshow_control_html = $('\
			<div id="slideshow_control" class="reply">\
				<h2>4chan-slideshow</h2>\
				<input type="checkbox" name="random" id="chan_slideshow_random"/>\
				<label for="chan_slideshow_random">Random</label><br />\
				<input type="checkbox" name="fit_whole_image" id="chan_slideshow_fit_whole"/>\
				<label for="chan_slideshow_fit_whole">Shrink image to screen size</label><br />\
				<input type="text" name="slide_dur" value="7" size="3" id="chan_slideshow_dur" /> Num seconds per slide<br />\
				<input type="button" id="chan_start_slideshow" value="Start the show!" />\
				<hr />\
				<b>Play/pause</b>: space bar<br />\
				<b>Next image</b>: X, right/down arrow<br />\
				<b>Prev image</b>: Z, up/left arrow<br />\
				<b>Quit</b>: escape\
			</div>');
		$("iframe + hr").after(slideshow_control_html);
		
		/* 
		// Sets up control to scroll with window
		// Must be done after insertion into page
		var win	= $(window);
	    var control_html_start_offset = slideshow_control_html.offset().top;
		var control_html_height = slideshow_control_html.height();
	    var top_padding = 20;
		var last_hr_offset = $("hr:last").offset().top;
		
		console.log("start offset: " + control_html_start_offset + "\nheight: " + control_html_height + "\nhr offset:" + last_hr_offset);
	
	    win.scroll(function() {
	        //if (win.scrollTop() > control_html_start_offset && (slideshow_control_html.offset().top + control_html_height) < last_hr_offset) {
		    if (win.scrollTop() > 0 && (slideshow_control_html.offset().top + control_html_height) < last_hr_offset) {
				var new_control_margin = Math.min(win.scrollTop() - control_html_start_offset + top_padding, last_hr_offset - control_html_height - top_padding);
	            slideshow_control_html.stop().animate({
	                marginTop: new_control_margin
	            });
	        } 
			else {
	            slideshow_control_html.stop().animate({
	                marginTop: top_padding
	            });
	        }
	    });*/
	}();
		
	var slideshow_html = $('<!--Thumbnail Navigation-->\
		<div id="prevthumb"></div>\
		<div id="nextthumb"></div>\
		\
		<!--Arrow Navigation-->\
		<a id="prevslide" class="load-item"></a>\
		<a id="nextslide" class="load-item"></a>\
		\
		<div id="thumb-tray" class="load-item">\
			<div id="thumb-back"></div>\
			<div id="thumb-forward"></div>\
		</div>\
		\
		<!--Control Bar-->\
		<div id="controls-wrapper" class="load-item">\
			<div id="controls">\
			\
				<a id="play-button"><img id="pauseplay" src="' + pausepng + '"/></a>\
				\
				<!--Slide counter-->\
				<div id="slidecounter">\
					<span class="slidenumber"></span> / <span class="totalslides"></span>\
				</div>\
			\
				<!--Slide captions displayed here-->\
				<div id="slidecaption"></div>\
			\
				<!--Thumb Tray button-->\
				<a id="tray-button"><img id="tray-arrow" src="' + buttontrayuppng + '"/></a>\
			\
				<!--Navigation-->\
				<ul id="slide-list"></ul>\
			\
			</div>\
		</div>\
	');

	var find_img_info = function(){
		var img_anchors = $("form[name=delform] a:parent[href$=jpeg], form[name=delform] a[href$=jpg], form[name=delform] a[href$=png], form[name=delform] a[href$=gif]").has("img");
		return $.makeArray(img_anchors.map(function(){
			return {
				image: this.href, 
				thumb: $("img", this).attr("src")
				};
			}));		
	};
	
	var setup_slideshow = function(){
		if(typeof img_info === "undefined"){
			img_info = find_img_info();
		}
		supersized_setup();
		$("body").append(slideshow_html);

		slideshow_initialized = true;
	};

	var start_slideshow = function(){
		var random_order = $("#chan_slideshow_random").prop("checked");
		var slide_duration = Math.round(Number($("#chan_slideshow_dur").val()) * 1000);
		
		$.supersized({
			random					: 	random_order,
			autoplay				: 	true, 
			image_protect			: 	false,
			slide_interval          :   slide_duration,		// Length between transitions
			transition              :   1, 					// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	400,				// Speed of transition
												   
			// Components							
			slide_links	:	"blank",	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			slides 		:  	img_info
		});

		$("body").css("overflow", "hidden");
		//slideshow_html.show();	
	};

	// Catch escape key to stop slideshow - FIXME
	var stop_slideshow = function(e){
		var STOP_KEY = 27; // escape keycode
		//console.log("which:" + e.which);
		
		if(e.which === STOP_KEY) {
			if(!vars.is_paused) {
				api.playToggle();
			}
			//$(".load-item").hide();
			//$(slideshow_html).hide();
			$("#supersized").remove();
			$("#controls-wrapper").remove();
			$("#nextthumb").remove();
			$("#prevthumb").remove();
			$("#thumb-tray").remove();
		}

		$("body").css("overflow", "auto");
	};

	// Callback for when "start" button is clicked
	var setup_and_start_slideshow = function(){
		if(!slideshow_initialized){
			setup_slideshow();
		}
		start_slideshow();
	};
	
	// Attach callback
	$("#chan_start_slideshow").click(setup_and_start_slideshow);
	
	$(document).keydown(stop_slideshow);
}

// Check for existence of GM_addStyle, and set if necess
if(typeof GM_addStyle == 'undefined') {
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }
}

// My control panel CSS
GM_addStyle("\
	#slideshow_control {\
		/* margin-top: 20px; */\
	    padding: 15px;\
		/* position: absolute; */\
		position: fixed; \
		right: 20px;\
		top: 20px; \
	    border: 6px solid black;\
	    border-radius: 50px 25px;\
	}\
\
	#slideshow_control input, hr {\
	    margin: 4px;\
	}\
")

// Supersized CSS
GM_addStyle("\
	\
	* { margin:0; padding:0; }\
		img { border:none; }\
		\
		#supersized-loader { position:absolute; top:50%; left:50%; z-index:2000; width:60px; height:60px; margin:-30px 0 0 -30px; text-indent:-999em; background:url(../img/progress.gif) no-repeat center center;}\
		\
		#supersized {  display:block; position:fixed; left:0; top:0; overflow:hidden; z-index:1001; height:100%; width:100%; }\
			#supersized img { width:auto; height:auto; position:relative; display:none; outline:none; border:none; }\
				#supersized.speed img { -ms-interpolation-mode:nearest-neighbor; image-rendering: -moz-crisp-edges; }	/*Speed*/\
				#supersized.quality img { -ms-interpolation-mode:bicubic; image-rendering: optimizeQuality; }			/*Quality*/\
			\
			#supersized li { display:block; list-style:none; z-index:1970; position:fixed; overflow:hidden; top:0; left:0; width:100%; height:100%; background:#111; }\
			#supersized a { width:100%; height:100%; display:block; }\
				#supersized li.prevslide { z-index:1980; }\
				#supersized li.activeslide { z-index:1990; }\
				#supersized li.image-loading { background:#111 url(../img/progress.gif) no-repeat center center; width:100%; height:100%; }\
					#supersized li.image-loading img{ visibility:hidden; }\
				#supersized li.prevslide img, #supersized li.activeslide img{ display:inline; }\
	\
	/* Controls Bar\
	----------------------------*/\
	#controls-wrapper { margin:0 auto; height:42px; width:100%; bottom:0px; left:0; z-index:2004; background:url(../img/nav-bg.png) repeat-x; position:fixed; }\
		#controls { overflow:hidden; height:100%; position:relative; text-align:left; z-index:2005; }\
			#slidecounter { float:left; color:#999; font:14px \"Helvetica Neue\", Helvetica, Arial, sans-serif; text-shadow:#000 0 -1px 0; margin:0px 10px 0 15px; line-height:42px; }\
			#slidecaption { overflow:hidden; float:left; color:#FFF; font:400 14px \"Helvetica Neue\", Helvetica, Arial, sans-serif; text-shadow:#000 1px 1px 2px; margin:0 20px 0 0; line-height:42px; }\
			\
			#navigation { float:right; margin:0px 20px 0 0; }\
				#play-button{ float:left; margin-top:1px;border-right:1px solid #333; background:url('../img/bg-hover.png') repeat-x 0 44px; }\
					#play-button:hover{ background-position:0 1px; cursor:pointer; }\
				\
				#prevslide, #nextslide{ position:absolute; height:43px; width:43px; top:50%; margin-top:-21px; opacity:0.6; }\
					#prevslide{ left:10px; background:url('../img/back.png'); }\
					#nextslide{ right:10px; background:url('../img/forward.png'); }\
						#prevslide:active, #nextslide:active{ margin-top:-19px; }\
						#prevslide:hover, #nextslide:hover{ cursor:pointer; }\
				\
				ul#slide-list{ padding:15px 0; float:left; position:absolute; left:50%; }\
					ul#slide-list li{ list-style:none; width:12px; height:12px; float:left; margin:0 5px 0 0; }\
						ul#slide-list li.current-slide a, ul#slide-list li.current-slide a:hover{ background-position:0 0px; }\
						ul#slide-list li a{ display:block; width:12px; height:12px; background:url('../img/nav-dot.png') no-repeat 0 -24px; }\
							ul#slide-list li a:hover{ background-position:0 -12px; cursor:pointer; }\
				\
				#tray-button{ float:right; margin-top:1px; border-left:1px solid #333; background:url('../img/bg-hover.png') repeat-x 0 44px; }\
					#tray-button:hover{ background-position:0 1px; cursor:pointer; }\
		\
	\
	/* Thumbnail Navigation\
	----------------------------*/	\
	#nextthumb,#prevthumb { z-index:2002; display:none; position:fixed; bottom:61px; height:75px; width:100px; overflow:hidden; background:#ddd; border:1px solid #fff; -webkit-box-shadow:0 0 5px #000; }\
		#nextthumb { right:12px; }\
		#prevthumb { left:12px; }\
			#nextthumb img, #prevthumb img { width:150px; height:auto;  }\
			#nextthumb:active, #prevthumb:active { bottom:59px; }\
			#nextthumb:hover, #prevthumb:hover { cursor:pointer; }\
	\
	\
	/* Thumbnail Tray\
	----------------------------*/			\
	#thumb-tray{ position:fixed; z-index:2003; bottom:0; left:0; background:url(../img/bg-black.png); height:150px; width:100%; overflow:hidden; text-align:center; -moz-box-shadow: 0px 0px 4px #000; -webkit-box-shadow: 0px 0px 4px #000; box-shadow: 0px 0px 4px #000; }\
		\
		#thumb-back, #thumb-forward{ position:absolute; z-index:2005; bottom:42px; height:108px; width:40px; }\
			#thumb-back{ left:0; background: url('../img/thumb-back.png') no-repeat center center;}\
			#thumb-forward{ right:0; background:url('../img/thumb-forward.png') no-repeat center center;}\
				#thumb-back:hover, #thumb-forward:hover{ cursor:pointer; background-color:rgba(256,256,256, 0.1); }\
					#thumb-back:hover{ border-right:1px solid rgba(256,256,256, 0.2); }\
					#thumb-forward:hover{ border-left:1px solid rgba(256,256,256, 0.2); }\
		\
		\
		ul#thumb-list{ display:inline-block; list-style:none; position:relative; left:0px; padding:0 0px; }\
			ul#thumb-list li{ background:#111; list-style:none; display:inline; width:150px; height:108px; overflow:hidden; float:left; margin:0; }\
				ul#thumb-list li img { width:200px; height:auto; opacity:0.5; -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)\"; filter:alpha(opacity=60); }\
				ul#thumb-list li.current-thumb img, ul#thumb-list li:hover img{ opacity:1; -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\"; filter:alpha(opacity=100); }\
				ul#thumb-list li:hover{ cursor:pointer; }\
");


// addJQuery courtesy of Erik Vergobbi Vold
// URL: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
  	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  	script.addEventListener('load', 
		function() {
    		var script = document.createElement("script");
    		script.textContent = "(" + callback.toString() + ")();";
    		document.body.appendChild(script);
  		}, 
		false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(jQmain);
