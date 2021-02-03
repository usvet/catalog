<?
  header('Content-type: text/html; charset=utf-8');
  require_once("components/db.php");
  $id = $_POST['id'];
  $author = htmlspecialchars( trim($_POST["author"]) ); 
  $price = htmlspecialchars( trim($_POST["price"]) );
  $titleBook = htmlspecialchars( trim($_POST["title_book"]) );
  $fullDescription = htmlspecialchars( trim($_POST["full_description"]) );
  $imageSrc = htmlspecialchars( trim($_POST["image_src"]) );
  
  if (empty($author) || empty($price) || empty($titleBook) || empty($fullDescription) || empty($imageSrc)) {
    exit("Не все поля заполнены"); //как return для файла-обработика
  }
  
  if (mb_strlen($author) < 3 || $price < 0) {
    exit("Невалидные данные"); 
  }
  
  $result = $mysqli->query("UPDATE `products` SET `author` = '$author',`price`='$price',`title_book`= '$titleBook',`full_description`='$fullDescription',`image_src`='$imageSrc' WHERE `id`='$id'");

  if($result) {
    exit("ok");
  } else {
    exit("Не удалось обновить товар");
  }
