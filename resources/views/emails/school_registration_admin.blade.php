<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Heroes: New School Registration</title>
    <style>
        .container {
            margin: 0 auto;
            max-width: 600px;
            padding: 6px 20px 6px 20px
        }

        .header {
            display: flex;
            justify-content: center;
            background-color: white;
            width: 100%;
            padding: 10px;
        }

        .logo {
            padding-top: 20px;
            padding-bottom: 20px;
            width: 140px;
            margin-left: auto;
            margin-right: auto;
        }

        .content {
            padding-top: 10px;
        }
    </style>
</head>

<div class="container">
    <div class="header">
        <img src="https://heroes.my/img/heroes-logo.png" alt="logo" class="logo" />
    </div>
    <div class="content">
        <table style="table-layout: auto; width: 80%;">
            <tr>
                <td style="flex: 1; font-size: 18px; justify-content: center">Hi Admin, </td>
            </tr>
        </table>

        <br>
        <p style="font-size: 14px; text-align: justify">There is a new registration received. Please proceed to review the application.</p>
        <br>
        <p>School Information:</p>
        <p>
            School Name: {{ $school->school_name }}
        </p>
        <p>
            Contact Person: {{ $school->contact_person }}
        </p>
        <p>
            Email: {{ $school->email }}
        </p>
        <p>
            Contact No: {{ $school->contact_no }}
        </p>
        <p>
            Mobile No: {{ $school->mobile_no }}
        </p>
    </div>
</div>

</body>

</html>