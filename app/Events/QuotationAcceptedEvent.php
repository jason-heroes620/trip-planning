<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QuotationAcceptedEvent

{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $quotation;
    public $school;
    /**
     * Create a new event instance.
     */
    public function __construct($quotation, $school)
    {
        $this->quotation = $quotation;
        $this->school = $school;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('quotation-accepted'),
        ];
    }
}
