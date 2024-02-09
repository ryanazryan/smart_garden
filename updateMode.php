<?php     
  require 'database.php';
  
  if (!empty($_POST)) {
    $Stat2 = $_POST['Stat2'];
      
    
    $pdo = Database::connect();
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "UPDATE statusled SET Stat2 = ? WHERE ID = 0";
    $q = $pdo->prepare($sql);
    $q->execute(array($Stat2));
    Database::disconnect();
    header("Location: Main.php");
  }
?>