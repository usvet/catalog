<?php

$dbhost = "localhost";
$dbuser = "usvet17u_base13"; //root
$dbpass = "6R8O&rrS"; //root
$dbname = "usvet17u_base13";
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
$mysqli->set_charset("utf-8");

if ($mysqli->connect_error) {
  die("Не удалось подключиться к БД ".$mysqli->connect_error);
}