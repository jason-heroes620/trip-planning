<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;

class ProposalController extends Controller
{
    public function checkExistingProposal(Request $req)
    {
        $user = $req->user();
        $proposal = Proposal::where('proposal_status', 0)
            ->where('user_id', $user->id)
            ->get();
        $proposal = ['1', '2'];

        return response()->json($proposal);
    }
}
