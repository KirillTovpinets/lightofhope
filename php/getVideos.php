<?php
    ini_set("display_errors", 1);
    
    $access_token = 'eda1fcdf5d87ea1325250de9631dde8b';
    $direction = "desc";
    $sort = "date";
    $sourse = $_POST["catch"];
    $request = curl_init();
    $url = "";
    $url = "https://api.vimeo.com/users/13887624/$sourse?sort=$sort&direction=$direction&access_token=$access_token&per_page=100";
    
    curl_setopt($request, CURLOPT_URL, $url);
    curl_setopt($request, CURLOPT_RETURNTRANSFER,1);
    $result = curl_exec($request);
    echo $result;
?>