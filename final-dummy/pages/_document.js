import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <script defer src="/assets/vendor/purecounter/purecounter.js"></script>
        <script
          defer
          src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"
        ></script>
        <script
          defer
          src="/assets/vendor/glightbox/js/glightbox.min.js"
        ></script>
        <script
          defer
          src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"
        ></script>
        <script defer src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script
          defer
          src="/assets/vendor/waypoints/noframework.waypoints.js"
        ></script>
        <script defer src="/assets/js/main.js"></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
