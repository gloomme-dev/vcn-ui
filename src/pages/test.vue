<template>
<q-page>
<p>hi</p>

  <q-btn @click="embedImages">Sign PDF using url </q-btn>
  <q-form @submit.prevent="signDocument" >
    <q-file v-model="imageFile" label="Image" type="file" ref="file" @input="uploadImage(imageFile)" />
    <q-file v-model="pdfFile" label="PDF" type="file" ref="file" @input="uploadPdf(pdfFile)" />
    <q-card-actions>
      <q-btn color="primary" type="submit" >Sign PDF from form Upload</q-btn>
    </q-card-actions>
  </q-form>

</q-page>
</template>

<script>
import { PDFDocument } from 'pdf-lib';
import  download  from 'downloadjs';
import { StandardFonts, rgb, degrees } from 'pdf-lib';
import { date } from 'quasar'
import * as page from "pdf-lib";
export default {
  data() {
    return {
      imageFile: null,
      pdfFile: null,
    }
  },

  methods: {

    // method to upload and image to local storage imageBase64
     uploadImage(imageFile) {
      const file = this.imageFile;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result;
      //   save to local storage
        localStorage.setItem('imageBase64',reader.result)
        this.$store.commit("addToRows", reader.result);
      };
    },

    // method to upload a pdf to local storage pdfBase64
     uploadPdf(pdfFile) {
      const file = this.pdfFile;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pdfBase64 = reader.result;
        localStorage.setItem('pdfBase64',reader.result)
        this.$store.commit("addToDocs", reader.result);
      };
    },

    // method to embed images to pdf using pdf-lib with url
    async  embedImages() {

      //  get imageBase64 and pdfBase64 from local storage
      const imageBase64 = this.$store.state.rows[0]
      // const pdfBase64 = this.$store.state.docs[0]

      const pdfBase64 = localStorage.getItem('pdfBase64')

      // get the pdf from url
      const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
      const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      const imageUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png'
      // from asset url get the image extension
      const imageExtension = imageUrl.split('.').pop()


      // Get the first page of the PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      // if imageExtension is jpg or jpeg
      if (imageExtension === 'jpg' || imageExtension === 'jpeg') {
        const jpgImageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer())
        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
        const jpgDims = jpgImage.scale(0.2)
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawImage(jpgImage, {
          x: firstPage.getWidth() / 2 - jpgDims.width / 2 + 75,
          y: firstPage.getHeight() / 2 - jpgDims.height,
          width: jpgDims.width,
          height: jpgDims.height,
        })
      }
      else if (imageExtension === 'png') {
        const pngImageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer())
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.2)
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawImage(pngImage, {
          x: firstPage.getWidth() / 2 - pngDims.width / 2 + 75,
          y: firstPage.getHeight() / 2 - pngDims.height,
          width: pngDims.width,
          height: pngDims.height,
        })
      }



      // Save the modified PDF as a base64 string and send it back in the response
      const pdfBytes = await pdfDoc.save();
      const pdfBase64WithImage = pdfBytes.toString('base64');


      // Trigger the browser to download the PDF document
      download(pdfBytes, "pdf-lib_image_embedding_example.pdf", "application/pdf");
    },
  //   nethod to embed images to pdf using pdf-lib with base64
    async signDocument(){
      const pdfBase64 = localStorage.getItem('pdfBase64')
      const imageBase64 = localStorage.getItem('imageBase64')

      //   if imageBase64 is jpg or jpeg
      if (imageBase64.includes('jpeg') || imageBase64.includes('jpg')) {
        const pdfDoc = await PDFDocument.load(pdfBase64);
        const jpgImageBytes = imageBase64
        const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
        const jpgDims = jpgImage.scale(0.2)
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawImage(jpgImage, {
          x: firstPage.getWidth() / 2 - jpgDims.width / 2 + 75,
          y: firstPage.getHeight() / 2 - jpgDims.height,
          width: jpgDims.width,
          height: jpgDims.height,
        })
        const pdfBytesWithImage = await pdfDoc.save();
        const pdfBase64WithImage = pdfBytesWithImage.toString('base64');
        download(pdfBytesWithImage, "pdf-lib_image_embedding_example.pdf", "application/pdf");
      }
      else if (imageBase64.includes('png')) {
        const pdfDoc = await PDFDocument.load(pdfBase64);
        const pngImageBytes = imageBase64
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.2)
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawImage(pngImage, {
          x: firstPage.getWidth() / 2 - pngDims.width / 2 + 75,
          y: firstPage.getHeight() / 2 - pngDims.height,
          width: pngDims.width,
          height: pngDims.height,
        })
        const pdfBytesWithImage = await pdfDoc.save();
        const pdfBase64WithImage = pdfBytesWithImage.toString('base64');
        download(pdfBytesWithImage, "pdf-lib_image_embedding_example.pdf", "application/pdf");
      }

      //
      // const pdfDoc = await PDFDocument.load(pdfBase64);
      // const pngImageBytes = imageBase64
      // const pngImage = await pdfDoc.embedPng(pngImageBytes)
      // const pngDims = pngImage.scale(0.2)
      // const pages = pdfDoc.getPages();
      // const firstPage = pages[0];
      // firstPage.drawImage(pngImage, {
      //   x: firstPage.getWidth() / 2 - pngDims.width / 2 + 75,
      //   y: firstPage.getHeight() / 2 - pngDims.height,
      //   width: pngDims.width,
      //   height: pngDims.height,
      // })
      // const pdfBytesWithImage = await pdfDoc.save();
      // const pdfBase64WithImage = pdfBytesWithImage.toString('base64');
      // download(pdfBytesWithImage, "pdf-lib_image_embedding_example.pdf", "application/pdf");
    }
  },
  computed: {

  }
};
</script>
<style scoped>

</style>
