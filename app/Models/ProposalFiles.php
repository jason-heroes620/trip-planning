<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ProposalFiles extends Model
{
    use HasUuids;

    protected $table = 'proposal_files';
    protected $primaryKey = 'proposal_file_id';
    protected $fillable = [
        'proposal_file_id',
        'proposal_id',
        'proposal_file_type',
        'original_file_name',
        'file_path',
    ];
    public $timestamps = false;

    public function proposal()
    {
        return $this->belongsTo(Proposal::class, 'proposal_id');
    }
}
