<?php

if ($feed_url = $_GET['feed']) {
  $xml_string = file_get_contents($feed_url);
  $xml = simplexml_load_string($xml_string);
  $json = json_encode($xml);
  $array = json_decode($json,TRUE);
  header('Cache-Control: no-cache, must-revalidate');
  header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
  header('Content-type: application/json');
  $output = json_encode($array);
  if ($jsonp = $_GET['jsonp']) {
    $output = $jsonp . '(' . $output . ')';
  }
  echo $output;
}

