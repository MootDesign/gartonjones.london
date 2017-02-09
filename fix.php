<?php

$fix = new FixGJImages;
//$fix->copyDirectoryStructure('uploads', 'uploads_new');
//$fix->copyImagesFromWPPosts();
$fix->copyImagesFromWPPostmeta();

class FixGJImages
{
	private $mysqli;
	
	public function __construct()
	{
		$this->mysqli = new mysqli("localhost", "admin_gardev", "aIw?wP4vWhWS", "admin_gardev");
		if ($mysqli->connect_errno) {
			echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
			die;
		}
		
		echo 'Connected to: ' . $this->mysqli->host_info . "\n";
		
		echo 'Current DIR is: ' .dirname(__FILE__) . "\n\n";
	}

	public function copyDirectoryStructure($src,$dst) 
	{ 
		$dir = opendir($src); 
		@mkdir($dst); 
		while(false !== ( $file = readdir($dir)) ) 
		{ 
			if (( $file != '.' ) && ( $file != '..' )) 
			{ 
				if ( is_dir($src . '/' . $file) ) 
				{ 
					$this->copyDirectoryStructure($src . '/' . $file,$dst . '/' . $file); 
				} 
			} 
		} 
		closedir($dir); 
		
		echo 'Copying directory ' .dirname(__FILE__).'/'.$src . 'to ' .dirname(__FILE__).'/'.$dst . "\n";
	} 
	

	public function copyImagesFromWPPosts()
	{
		echo 'copyImagesFromWPPosts'."\n";
		echo '====================='."\n\n";
		
		$res = $this->mysqli->query("SELECT * FROM  `wp_posts` WHERE  `post_parent` !=0 AND  `post_type` LIKE  'attachment'");

		$this->copyImages($res, 'guid');
	}
	
	public function copyImagesFromWPPostmeta()
	{
		echo 'copyImagesFromWPPostmeta'."\n";
		echo '========================'."\n\n";
		
		$res = $this->mysqli->query("SELECT *  FROM `wp_postmeta` WHERE (`meta_value` LIKE '%.jpg%' OR `meta_value` LIKE '%.jpeg' OR `meta_value` LIKE '%.png') AND `meta_key`!='_wp_attachment_metadata' AND `meta_value` NOT LIKE '%http://alto-live.s3.amazonaws.com/%'");

		$this->copyImages($res, 'meta_value');
	}
	
	public function copyImages($resource, $column)
	{
		$resource->data_seek(0);
		while ($row = $resource->fetch_assoc()) 
		{
			$filename = str_replace('http://gj.mootexpress.com/wp-content/uploads/', '', $row[$column]);
			$filename = str_replace('http://gjdev.mootexpress.com/wp-content/uploads/', '', $filename);
			$source = dirname(__FILE__).'/uploads/' . $filename;
			$destination = dirname(__FILE__).'/uploads_new/' . $filename;
			
			if (!copy($source, $destination)) 
			{
				echo "failed to copy $source...\n";
			}
			else
			{
				//echo 'ok: ' . $source . ' ==> ' . $destination . "\n";
			}
		}
	}
}

?>