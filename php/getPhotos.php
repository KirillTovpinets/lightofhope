<?php
    ini_set("display_errors", 1);
    // 9d954569ce41dd3a162e256a6387bb4e899d9380ff1354fa4810eaa92eaa956f420b44a0d8619c110e424
    // if(!isset($_GET["code"])){
    //     header("Access-Control-Allow-Origin: 'oauth.vk.com'");
    //     header("Location: https://oauth.vk.com/authorize?client_id=6139251&redirect_uri=https://buildyourself.by/php/getPhotos.php&scope=photos,offline&response_type=code");
    // }else{
        // $request = curl_init();
        $client_id = '6139251';
        $count = '2000';
        $owner_id = '-5443800';
        $client_secret = 'PPrjzOPVTAEbBz9KlbUt';
        $redirect_uri = 'https://buildyourself.by/php/getPhotos.php';
        $no_service = '1';
        $extended = '1';
        // $link = "https://oauth.vk.com/access_token?client_id=$client_id&client_secret=$client_secret&redirect_uri=$redirect_uri&code=$code";
        // curl_setopt($request, CURLOPT_URL, $link);
        
        // curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
        // $response = json_decode(curl_exec($request));
        $access_token = '9d954569ce41dd3a162e256a6387bb4e899d9380ff1354fa4810eaa92eaa956f420b44a0d8619c110e424';
        $photoes = file_get_contents("https://api.vk.com/method/photos.getAll?owner_id=$owner_id&count=$count&access_token=$access_token&no_service_albums=$no_service&extended=$extended");
        $array = json_decode($photoes);
        echo $photoes;
    // }
?>