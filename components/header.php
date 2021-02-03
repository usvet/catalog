<!doctype html>
<html lang="ru">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    
    <?= $links ?>
    <link rel="stylesheet" href="css/catalog.css">
    <title><?= $title ?></title>
  </head>
  <body>
   <div class="sticky-top text-center"> 
    <nav class="navbar navbar-expand-lg navbar-light position-sticky;" style="background-color: #17a2b8;">
      <a href="#" class="header_logo">
           <img src="img/logo4.png" alt="">
         </a>
      <a class="navbar-brand ml-5" href="#"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link ml-5" href="#">Домой <span class="sr-only"></span></a>
          <a class="nav-item nav-link ml-5" href="catalog.php">Каталог</a>
          <a class="nav-item nav-link ml-5" href="addProduct.php">Добавить товар</a>
         </div>
      </div>
    </nav>
  </div>