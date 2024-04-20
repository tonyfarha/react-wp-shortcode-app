<?php
/**
 * Plugin Name: React WP Shortcode App
 * Description: A simple plugin to render a React app via a shortcode.
 * Author: Tony Farha
 * Author URI: https://github.com/tonyfarha
 */

function dbt_render_react_wp_shortcode_app($atts) {

	$idPrefix = "dbt-react-wp-shortcode-app";
	$randomNum = rand(0, 100);

	$atts = shortcode_atts(
		[
			'id' => $randomNum, // Default ID if none is provided
			'app' => 'HelloWorld' // Default App if none is provided
		],
		$atts,
		'react_wp_shortcode_app'
	);

	$escapedID = esc_attr($atts['id']);
	$app = esc_attr($atts['app']);
	$containerID = $idPrefix . '-' . $escapedID;

	wp_enqueue_script("dbt-react-wp-shortcode-app-$escapedID", plugins_url('/build/index.js', __FILE__), array('wp-element'), time(), true);
	wp_enqueue_style('dbt-react-wp-shortcode-app-style', plugins_url('/build/style-index.css', __FILE__), array(), time());

	$data_to_pass_to_js = [
		'containerID' => $containerID,
		'app' => $app
	];

	wp_localize_script("dbt-react-wp-shortcode-app-$escapedID", 'pluginData', $data_to_pass_to_js);

	return '<div id="' . $containerID . '"></div>';
}

add_shortcode('react_wp_shortcode_app', 'dbt_render_react_wp_shortcode_app');
