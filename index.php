<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Kikizon's Web ™</title>

	<style type="text/css">

		*
		{ 
			margin: 0;
		}

		body 
		{ 
			background: rgb(0,0,0);
			overflow: hidden;
		}

		#canvas
		{
			display: block;
			height: 100vh;
			width: 100%;
			background: #000;
		}
		

		.first
		{
			position: absolute;
			background: transparent;
			width: 25%;
			height: 100vh;
			left: 0;
			text-align: center;
			z-index: 100;
			color: #fff;
			text-align: center;
			vertical-align: middle;
			line-height: 100vh;
			font-size: 1.4em;
		}

		.first:hover
		{
			border: 3px solid #fff;

			-webkit-animation-name: multicolors_border_1; /* Safari 4.0 - 8.0 */
  			-webkit-animation-duration: 12s; /* Safari 4.0 - 8.0 */
  			-webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  			animation-name: multicolors_border_1;
  			animation-duration: 12s;
			animation-iteration-count: infinite;
		}		

		.second
		{
			position: absolute;
			background: transparent;
			width: 25%;
			height: 100vh;
			left: 25%;
			text-align: center;
			z-index: 100;
			color: #fff;
			text-align: center;
			vertical-align: middle;
			line-height: 100vh;
			font-size: 1.4em;
		}

		.second:hover
		{
			border: 3px solid red;

			-webkit-animation-name: multicolors_border_2; /* Safari 4.0 - 8.0 */
  			-webkit-animation-duration: 12s; /* Safari 4.0 - 8.0 */
  			-webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  			animation-name: multicolors_border_2;
  			animation-duration: 12s;
			animation-iteration-count: infinite;
		}

		.third
		{
			position: absolute;
			background: transparent;
			width: 25%;
			height: 100vh;
			left: 50%;
			text-align: center;
			z-index: 100;
			color: #fff;
			text-align: center;
			vertical-align: middle;
			line-height: 100vh;
			font-size: 1.4em;
		}

		.third:hover
		{
			border: 3px solid green;

			-webkit-animation-name: multicolors_border_3; /* Safari 4.0 - 8.0 */
  			-webkit-animation-duration: 12s; /* Safari 4.0 - 8.0 */
  			-webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  			animation-name: multicolors_border_3;
  			animation-duration: 12s;
			animation-iteration-count: infinite;
		}

		.fourth
		{
			position: absolute;
			background: transparent;
			width: 25%;
			height: 100vh;
			right: 0;
			text-align: center;
			z-index: 100;
			color: #fff;
			text-align: center;
			vertical-align: middle;
			line-height: 100vh;
			font-size: 1.4em;
		}

		.fourth:hover
		{
			border: 3px solid blue;

			-webkit-animation-name: multicolors_border_4; /* Safari 4.0 - 8.0 */
  			-webkit-animation-duration: 12s; /* Safari 4.0 - 8.0 */
  			-webkit-animation-iteration-count: infinite; /* Safari 4.0 - 8.0 */
  			animation-name: multicolors_border_4;
  			animation-duration: 12s;
			animation-iteration-count: infinite;
		}

		/* Safari 4.0 - 8.0 */
		@-webkit-keyframes multicolors_border_1
		{
  			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));				
				$i++;
			}

			?>
		}

		/* Standard syntax */
		@keyframes multicolors_border_1
		{
			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));
				
				$i++;
			}

			?>
		}

		@-webkit-keyframes multicolors_border_2
		{
  			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));				
				$i++;
			}

			?>
		}

		/* Standard syntax */
		@keyframes multicolors_border_2
		{
			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));
				
				$i++;
			}

			?>
		}

		@-webkit-keyframes multicolors_border_3
		{
  			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));				
				$i++;
			}

			?>
		}

		/* Standard syntax */
		@keyframes multicolors_border_3
		{
			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));
				
				$i++;
			}

			?>
		}

		@-webkit-keyframes multicolors_border_4
		{
  			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));				
				$i++;
			}

			?>
		}

		/* Standard syntax */
		@keyframes multicolors_border_4
		{
			<?php
			
			$i = 0;
			while( $i <= 100 )
			{
				printf("%d%% { border: 3px solid #%06X; }\n", $i, mt_rand( 0, 0xFFFFFF ));
				
				$i++;
			}

			?>
		}


	</style>

	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<script>
		(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-8824751107428831",enable_page_level_ads: true});
	</script>

</head>
<body>

	<a href="https://kikizon.blogspot.com/" target="__blank"><div class="first"> Mi Blog </div></a>
	<a href="https://foro.kikizon.xyz/" target="__blank"><div class="second">Mi Foro</div></a>
	<a href="https://servers.kikizon.xyz" target="__blank"><div class="third">Mis servers</div></a>
	<a href="https://fb.com/kikizon.blogspot.mx" target="__blank"><div class="fourth">Mi Facebook</div></a>

	<canvas id="canvas"></canvas>
	<script type="text/javascript" src="particles1.js"></script>
</body>
</html>