let text = "100000101";
JsBarcode("#barcode1", text);
JsBarcode("#barcode2", text);
JsBarcode("#barcode3", text);

var qrcode1 = new QRCode(document.getElementById("qrcode1"), {
    width: 70,
    height: 80,
    useSVG: true
});
qrcode1.makeCode("100000101");

var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
    width: 70,
    height: 80,
    useSVG: true
});
qrcode2.makeCode("100000101");

var qrcode3 = new QRCode(document.getElementById("qrcode3"), {
    width: 70,
    height: 80,
    useSVG: true
});
qrcode3.makeCode("100000101");