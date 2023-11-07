<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'bd_smdigital' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '~m}%N$V7WTA|l~5%sRErK$NfajexMtXHDaUYE&mo+6G,Jcn7[l)?tK:MQ_<*$ iw' );
define( 'SECURE_AUTH_KEY',  'Yj?7K{kw4gYy-r*DG=bLr.sIIx/LSy5*GJX1B62=i(K#N5uWo<@u]?tF2<,mc{U ' );
define( 'LOGGED_IN_KEY',    '`Xo<.k` 6B<1(0g=#3iLSj)R&`9[$7;[2Kw4];svWUT->Z_A}2B!y?HEA}7ICUKE' );
define( 'NONCE_KEY',        'RfO>s%hz:`#/Ct`E+Nk{W4PlLkiB68W_y|wO+_#fjDs6QAZ~jH_@ #J{,-c-#hU@' );
define( 'AUTH_SALT',        'i-xb[y|n3rS,+j6K^ks+`?=MqzH;##OXxEbG]q_| *<-KE/fEj<<LP43+}He=5;Z' );
define( 'SECURE_AUTH_SALT', '97AKX7Z^|q]]R|RJ*PrF!K-A?c*.yJ2-Raj2YC5b@SX$5K&R($kOvVXt$j[=Z=8V' );
define( 'LOGGED_IN_SALT',   'XJ{PsyhIk9`U:DCA /y4t{F@08wuN4:Br/tdL29/Z*H !vRVEsp,Jaqp&%6xDGhA' );
define( 'NONCE_SALT',       '@+b3VWfUX@t4W oqO?Q~/7+ZJpea0YEj2eZ2&$TjVf#9]=,=dn=-v Yz7&hR)>B ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
