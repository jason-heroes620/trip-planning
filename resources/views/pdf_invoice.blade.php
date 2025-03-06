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

        div {
            padding: 0px 40px 0px 40px;
        }

        h2 {
            color: #333;
            text-align: center;
            font-size: 18px;
        }

        /* p {
            font-size: 14px;
        } */

        img {
            width: 150px;
            height: 100px;
        }

        table {
            border-width: 1px;
            border: #333;
        }

        tablerow {
            border: #333;
            border-width: 1px;
        }
    </style>
</head>

<body>
    <div>
        <img src="data:image/png;base64,{{ $schoolLogo }} " alt="">
    </div>
    <h2>{{ $title }}</h2>
    <div>
        <p><strong>Proposed Visitation Date:</strong> {{ $date }}</p>
    </div>

    <div>
        @foreach ($products as $product)
        <span>
            <strong>{{ $product->product}}</strong>
        </span>
        <br>
        <p><span><strong><u>Desctiption</u></strong> </span></p>
        <p>
            {!! html_entity_decode($product->description) !!}
        </p>
        <br>
        <p>
            <span><strong><u>Activities</u></strong></span>
        </p>

        <p>
            {!! html_entity_decode($product->activities) !!}
        </p>
        @endforeach
    </div>
    <br>
    <p></p>
    <div>
        <span><b>Estimated Cost:</b></span>
        <table class="table">
            <tr class="tablerow">
                <td>Costing Per Student: </td>
                <td>RM{{ $cost_per_student }}</td>
            </tr>
        </table>
    </div>
    <br>
    <br>
    <div>
        @foreach ($images as $img)
        <img src="data:image/png;base64,{{ $img->image }}" alt="">
        @endforeach
    </div>
    <!-- <table>
        @foreach ($products as $product)
        <tr>
            <td>
                <img src=" data:image/png;base64,{{ $product->image }}" alt="">
        </td>
        <td>

        </td>
        </tr>
        @endforeach
        </table> -->

</body>

</html>