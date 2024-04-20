<?php
/**
 * Plugin Name: React WP Shortcode App
 * Description: A simple plugin to render a React app via a shortcode.
 * Author: Tony Farha
 * Author URI: https://github.com/tonyfarha
 */

function dbt_render_react_wp_shortcode_app($atts) {

	$idPrefix = "dbt-react-wp-shortcode-app";
	$randomNum = rand(0, 9999);

	$atts = shortcode_atts(
		[
			'id' => $randomNum, // Default ID if none is provided
			'app' => 'HelloWorld' // Default App if none is provided
		],
		$atts,
		'react_wp_shortcode_app'
	);

	$id = esc_attr($atts['id']);
	$app = esc_attr($atts['app']);
	$appID = $idPrefix . '-' . $app . '-' . $id;

	wp_enqueue_script("$appID-script", plugins_url('/build/index.js', __FILE__), array('wp-element'), time(), true);
	wp_enqueue_style("$appID-style", plugins_url('/build/style-index.css', __FILE__), array(), time());

	$data_to_pass_to_js = [
		'containerID' => $appID,
		'app' => $app
	];

	wp_localize_script("$appID-script", 'pluginData', $data_to_pass_to_js);

	return '<div id="' . $appID . '"></div>';
}

add_shortcode('react_wp_shortcode_app', 'dbt_render_react_wp_shortcode_app');
