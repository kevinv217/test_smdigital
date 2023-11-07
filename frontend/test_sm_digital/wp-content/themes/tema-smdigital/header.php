<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <?php wp_head(); ?>
</head>

<body>

    <header>
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <img src="<?php echo get_template_directory_uri()?>/assets/img/logoprincipal.png"
                        alt="logoprincipal" class="logoprincipal" />
                </div>
                <div class="col-8 d-flex">
                    <nav>
                        <?php wp_nav_menu( 
                            array(
                                'theme location' => 'top_menu', //localizacion del menu dentro del administrado, referencia es top menu 
                                'menu_class' => 'menu-principal', //agg clase para nuestros estilos en ul
                                'container_class' => 'container-menu', //agg clase al contenedor donde esta ul con el menu
                            ) );
                        ?>
                    </nav>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <form role="search" method="get" id="searchform"
                                        action="<?php echo home_url('/'); ?>">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Buscar" name="s"
                                                id="s">
                                            <div class="input-group-btn">
                                                <button class="btn btn-default" type="submit"><i
                                                        class="glyphicon glyphicon-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>