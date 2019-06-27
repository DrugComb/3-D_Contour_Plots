<?php
/* Database connection start */
$conn =    mysqli_connect($servername, $username, $password, $dbname) or die("Connection failed: " . mysqli_connect_error());
 
$blockid=$_GET['block_id'];

$sql = " select ROUND(conc_r,5) as conc_r,ROUND(conc_c,5) as conc_c ,ROUND(response,2) as response,ROUND(synergy_zip,2) as synergy_zip,ROUND(synergy_bliss,2) as synergy_bliss,ROUND(synergy_hsa,2) as synergy_hsa,ROUND(synergy_loewe,2) as synergy_loewe  from surface where block_id = $blockid  ";
$sqlresponse=" select   ROUND(conc_r,5) as conc_r,ROUND(conc_c,5) as conc_c ,ROUND(response,2) as response,ROUND(synergy_zip,2) as synergy_zip,ROUND(synergy_bliss,2) as synergy_bliss,ROUND(synergy_hsa,2) as synergy_hsa,ROUND(synergy_loewe,2) as synergy_loewe from response where block_id = $blockid ";
			
$query = mysqli_query($conn, $sql);
$query1= mysqli_query($conn, $sqlresponse);

$data = array();
$i=0;
while ($row = mysqli_fetch_array($query))
	{

    $data[$i] = array($row['conc_r'],$row['conc_c'],$row['response'],$row['synergy_zip'],$row['synergy_bliss'],$row['synergy_hsa'],$row['synergy_loewe']);
    $i++;
	}


$datae = array();
$i=0;
while ($row = mysqli_fetch_array($query1))
        {
        $datae[$i] = array($row['conc_r'],$row['conc_c'],$row['response'],$row['synergy_zip'],$row['synergy_bliss'],$row['synergy_hsa'],$row['synergy_loewe']);
        $i++;
        }



$final=array();
$final[0]=$data;
$final[1]=$datae;

echo json_encode($final); 
mysqli_close($conn);

?>

