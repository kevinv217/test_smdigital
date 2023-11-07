<?php

function init_template(){

    // permite que en nuestras entradas y paginas podemos usar una
    // imagen destacada
    add_theme_support('post-thumbnails');

    // arg 1 nos imprime el title de la pagina 
    add_theme_support( 'title-tag' );

    //  registrar menu
    register_nav_menus(  
        // la referencia  del array pertenecera al nombre de localizacion
        array(
             'top_menu' => 'Menu principal', //descripcion del valor que veremos en el administrador
        )

        // cree un menu y asignar la locacion html para imprimirlo en header 
        );
}

// after_setup_theme: hacer referencia para wp eliga el tema para mostra y ejecute esas opciones
// init_template: funcion que creamos - linea 3
add_action( 'after_setup_theme','init_template');


// manejo de librerias 
function assets(){
    // registrar dependencias 
    wp_register_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css', '', '5.3.1', 'all' );
    wp_register_style('montserrat', 'https://fonts.googleapis.com/css?family=Montserrat&display=swap','','1.0', 'all');
    wp_register_style('fontawesome', 'https://kit.fontawesome.com/yourkitcode.js','','1.0', 'all');

    // get_stylesheet_uri(): retorna o llama la direccion donde se encuentra nuestro archivo css 
    wp_enqueue_style( 'estilos', get_stylesheet_uri(), array('bootstrap','montserrat'), '1.0', 'all');  


    // integrar js 
    // wp_register_script: dejarnos como dependencia la libreria que carguemos pero no la inicializa
    wp_register_script('popper', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js', '', '2.11.8', true);

    // wp_enqueue_script: va a cargar en sources y juntas todas las dependencias que previamente hayamos registrado en wp_register_script
    wp_enqueue_script( 'bootstraps', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js', array('jquery','popper'), '5.3.1', true );

    // get_template_directory_uri(): nos devuelve el lugar donde esta el template no el archivo
    // para enlazar un archivo propio de js de forma dinamica
    wp_enqueue_script( 'custom', get_template_directory_uri().'/assets/js/custom.js', '', '1.0', true);
}

add_action( 'wp_enqueue_scripts', 'assets' );


// usando widgets 
function sidebar(){
    register_sidebar( 
        array(
            'name' => 'Pie de pagina',
            'id' => 'footer',
            'description' => 'Zona de widgets para pie de pagina',
            'before_title' => '<p>',
            'after_title' => '</p>',
            'before_widget' => '<div id="%1$s" class="%2$s">',
            'after_widget' => '</div>',
        )
    );

    // lo autogenerar el wdiget mismo dependiendo el contenido que estemos manejando
    // para resivir el argumento, debemos usar este caracter %1$s para ID, lo va a tomar  y lo va a retornar 
    // con el valor que asigne el widget dependiendo el tipo de contenido que utilicemos

    // para clases %2$s
}

add_action('widgets_init', 'sidebar');


// como generar un post type propio 
function productos_type(){
    $labels = array(
        'name' => 'Productos',
        'singular_name' => 'Producto', //se imprimira cada vez que muestra el admin sea en singular,
        'manu_name' => 'Productos', //el nombre que tendra en el admin,
    );

    $args = array(
        'label'  => 'Productos', //nombre por defecto sino encuentra uno asignado
        'description' => 'Productos de Platzi',
        'labels'       => $labels,
        'supports'   => array('title','editor','thumbnail', 'revisions'), ///que opciones puede tener el custompost_type, .revision: mostrara un historico que hemos hecho
        'public'    => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon'     => 'dashicons-cart',
        'can_export' => true,
        'publicly_queryable' => true,
        'rewrite'       => true, //nuestro posrtype tenga una url aignada
        'show_in_rest' => true //nuestro datos de post type pertenezcan al api

    );  
     
    register_post_type('producto', $args);
}

add_action('init', 'productos_type');


function custom_search_form() {
    $form = '<form role="search" method="get" id="searchform" action="' . home_url('/') . '">
        <div><label class="screen-reader-text" for="s">' . __('Search for:') . '</label>
        <input type="text" value="' . get_search_query() . '" name="s" id="s" />
        <input type="submit" id="searchsubmit" value="'. esc_attr__('Search') .'" />
        </div>
    </form>';
    return $form;
}

function custom_search_filter($query) {
    if ($query->is_search) {
        $query->set('post_type', 'post'); // Reemplaza 'post' con el tipo de contenido que deseas buscar (páginas, productos, etc.)
    }
    return $query;
}

add_filter('pre_get_posts','custom_search_filter');

function custom_search_form_filter($form) {
    $form = custom_search_form();
    return $form;
}

add_filter('get_search_form','custom_search_form_filter');

