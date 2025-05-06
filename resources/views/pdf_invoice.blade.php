<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>{{ $title }}</title>
    <style>
        @page {
            margin: 0;
        }

        body {
            margin: 0;
            padding: 20px 0px 0px 0px;
            width: 100%;
            height: 100vh;
            background-color: #FFFEF3;
            /* Set background color */
            /* background-image: url('https://your-image-url.com/bg.jpg'); */
            /* Set background image */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            font-family: Arial, sans-serif;
        }

        .content {

            padding: 10px 40px 10px 40px;
        }

        h2 {
            color: #333;
            text-align: center;
            font-size: 18px;
        }

        .logo {
            width: 150px;
            height: auto;
        }

        .images {
            width: 250px;
            height: auto;
            padding-right: 8px;

        }

        table {
            border-width: 1px;
            border: #333;
        }

        .justify {
            text-align: justify;
        }

        .images-margin {
            margin: 20px;
            padding-top: 40px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
    </style>
</head>

<body>
    <div class="content">

        <img src="data:image/png;base64,{{ $schoolLogo }} " alt="" class="logo">

        <h2>{{ $title }}</h2>
        <div>
            <p><strong>Proposed Visitation Date:</strong> {{ $date }}</p>
        </div>
        <p></p>
        <div>
            @foreach ($products as $product)
            <span>
                <strong>{{ $product->product}}</strong>
            </span>
            <br>
            <div class=" justify">
                <span>
                    {!! html_entity_decode($product->description) !!}
                </span>
            </div>
            <br>
            <p>
                <span style="font-size: 14px"><strong><u>Activities</u></strong></span>
            </p>
            <div class="justify">
                <span>
                    {!! html_entity_decode($product->activities) !!}
                </span>
            </div>

            @endforeach
        </div>
        <br>
        <p></p>
        @if ( $include_student_cost === 'true' )
        <div>
            <span><b>Estimated Cost:</b></span>
            <table class="table">
                <tr class="tablerow">
                    <td>Costing Per Student: </td>
                    <td>RM{{ $cost_per_student }}</td>
                </tr>
            </table>
        </div>
        @endif
        <br>
        <br>

        <div class="images-margin">
            @foreach ($images as $img)
            <img src="data:image/png;base64,{{ $img->image }}" alt="" class="images">
            @endforeach
        </div>
    </div>
    </div>

</body>

</html>