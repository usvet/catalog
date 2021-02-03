<?php
  header('Content-type: text/html; charset=utf-8');
  require_once("components/db.php");
  $author = htmlspecialchars( trim($_POST["author"]) ); 
  $price = htmlspecialchars( trim($_POST["price"]) );
  $titleBook = htmlspecialchars( trim($_POST["title_book"]) );
  $fullDescription = htmlspecialchars( trim($_POST["full_description"]) );
  $imageSrc = htmlspecialchars( trim($_POST["image_src"]) );
  
  if (empty($author) || empty($price) || empty($titleBook) || empty($fullDescription) || empty($imageSrc)) {
    exit("Не все поля заполнены"); 
  }
  if (mb_strlen($author) < 3 || $price < 0) {
    exit("Невалидные данные"); 
  }
  
  $result = $mysqli->query("SELECT * FROM `products` WHERE `author`='$author' && `title_book` = '$titleBook'")->fetch_assoc();
  if($result) {
    exit("Такой товар уже существует");
  }
  
  $result = $mysqli->query("INSERT INTO `products`(`author`, `price`, `title_book`, `full_description`, `image_src`) VALUES ('$author', '$price', '$titleBook', '$fullDescription', '$imageSrc')");
  
  if($result) {
    exit("ok");
  } else {
    exit("Не удалось добавить товар");
  }