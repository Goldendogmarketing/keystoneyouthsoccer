import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Mail,
  MessageSquare,
  Send,
  Users,
  Shield,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  History,
} from 'lucide-react';

export const Route = createFileRoute('/(admin)/admin/communications')({
  component: AdminCommunications,
});

type RecipientType = 'all' | 'team' | 'league' | 'individual';
type MessageType = 'email' | 'sms';

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: MessageType;
}

interface SentMessage {
  id: string;
  subject: string;
  body: string;
  type: MessageType;
  recipientType: RecipientType;
  recipientName: string;
  sentAt: string;
  status: 'sent' | 'failed' | 'pending';
  recipientCount: number;
}

// Sample templates
const messageTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: 'Game Cancellation',
    subject: 'Game Cancelled - {{team}}',
    body: 'Due to {{reason}}, the game scheduled for {{date}} has been cancelled. We will notify you of the rescheduled date.',
    type: 'email',
  },
  {
    id: '2',
    name: 'Practice Reminder',
    subject: 'Practice Reminder - {{team}}',
    body: 'This is a reminder that {{team}} has practice on {{date}} at {{time}} at {{location}}.',
    type: 'email',
  },
  {
    id: '3',
    name: 'Schedule Change',
    subject: 'Schedule Change - {{team}}',
    body: 'There has been a change to the schedule. Please check the updated schedule on our website.',
    type: 'sms',
  },
];

// Sample sent messages
const sampleSentMessages: SentMessage[] = [
  {
    id: '1',
    subject: 'Practice Cancelled - Weather',
    body: 'Due to inclement weather, all practices for Saturday have been cancelled.',
    type: 'email',
    recipientType: 'all',
    recipientName: 'All Parents',
    sentAt: '2026-01-09T10:30:00',
    status: 'sent',
    recipientCount: 156,
  },
  {
    id: '2',
    subject: 'Game Reminder',
    body: 'Reminder: U10 Lions have a game tomorrow at 2pm at Twin Lakes Park.',
    type: 'sms',
    recipientType: 'team',
    recipientName: 'U10 Lions',
    sentAt: '2026-01-08T14:00:00',
    status: 'sent',
    recipientCount: 14,
  },
];

// Sample teams
const teams = [
  { id: '1', name: 'U6 Stars' },
  { id: '2', name: 'U8 Tigers' },
  { id: '3', name: 'U10 Lions' },
  { id: '4', name: 'U12 Eagles' },
];

// Sample leagues
const leagues = [
  { id: '1', name: 'Spring 2026' },
  { id: '2', name: 'Fall 2026' },
];

function AdminCommunications() {
  const [messageType, setMessageType] = useState<MessageType>('email');
  const [recipientType, setRecipientType] = useState<RecipientType>('all');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setMessage(template.body);
      setMessageType(template.type);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual sending logic
    alert('Message sent! (This is a demo - database integration pending)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">Send emails and SMS messages to parents and teams</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Message */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>Send email or SMS to parents, teams, or leagues</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSend} className="space-y-4">
                {/* Message Type */}
                <div className="space-y-2">
                  <Label>Message Type</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={messageType === 'email' ? 'default' : 'outline'}
                      onClick={() => setMessageType('email')}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={messageType === 'sms' ? 'default' : 'outline'}
                      onClick={() => setMessageType('sms')}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      SMS
                    </Button>
                  </div>
                </div>

                {/* Recipients */}
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button
                      type="button"
                      variant={recipientType === 'all' ? 'default' : 'outline'}
                      onClick={() => setRecipientType('all')}
                      className="justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      All Parents
                    </Button>
                    <Button
                      type="button"
                      variant={recipientType === 'team' ? 'default' : 'outline'}
                      onClick={() => setRecipientType('team')}
                      className="justify-start"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Team
                    </Button>
                    <Button
                      type="button"
                      variant={recipientType === 'league' ? 'default' : 'outline'}
                      onClick={() => setRecipientType('league')}
                      className="justify-start"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      League
                    </Button>
                    <Button
                      type="button"
                      variant={recipientType === 'individual' ? 'default' : 'outline'}
                      onClick={() => setRecipientType('individual')}
                      className="justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Individual
                    </Button>
                  </div>
                </div>

                {/* Team/League Selection */}
                {recipientType === 'team' && (
                  <div className="space-y-2">
                    <Label htmlFor="team">Select Team</Label>
                    <select
                      id="team"
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Choose a team...</option>
                      {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {recipientType === 'league' && (
                  <div className="space-y-2">
                    <Label htmlFor="league">Select League</Label>
                    <select
                      id="league"
                      value={selectedLeague}
                      onChange={(e) => setSelectedLeague(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Choose a league...</option>
                      {leagues.map((league) => (
                        <option key={league.id} value={league.id}>
                          {league.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {recipientType === 'individual' && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Recipient Email/Phone</Label>
                    <Input
                      id="email"
                      placeholder={messageType === 'email' ? 'email@example.com' : '+1 (555) 123-4567'}
                      required
                    />
                  </div>
                )}

                {/* Template Selection */}
                <div className="space-y-2">
                  <Label htmlFor="template">Use Template (Optional)</Label>
                  <select
                    id="template"
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a template...</option>
                    {messageTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} ({template.type.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject (Email only) */}
                {messageType === 'email' && (
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject"
                      required
                    />
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    rows={6}
                    required
                  />
                  {messageType === 'sms' && (
                    <p className="text-xs text-muted-foreground">
                      {message.length}/160 characters (standard SMS limit)
                    </p>
                  )}
                </div>

                {/* Template Variables Help */}
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">Available Variables:</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use these in your message: {'{{team}}'}, {'{{date}}'}, {'{{time}}'}, {'{{location}}'}, {'{{playerName}}'}, {'{{reason}}'}
                  </p>
                </div>

                {/* Send Button */}
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats & Templates */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Emails Sent (This Month)</span>
                </div>
                <span className="font-semibold">234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">SMS Sent (This Month)</span>
                </div>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Recipients</span>
                </div>
                <span className="font-semibold">156</span>
              </div>
            </CardContent>
          </Card>

          {/* Saved Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Templates
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {messageTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full text-left rounded-lg border p-3 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{template.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        template.type === 'email' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {template.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {template.body}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Message History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {sampleSentMessages.map((msg) => (
              <div key={msg.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${
                    msg.type === 'email' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {msg.type === 'email' ? (
                      <Mail className="h-4 w-4 text-blue-600" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold">{msg.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      To: {msg.recipientName} ({msg.recipientCount} recipients)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(msg.sentAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {msg.status === 'sent' ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Sent
                    </span>
                  ) : msg.status === 'failed' ? (
                    <span className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Failed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 text-sm">
                      <Clock className="h-4 w-4" />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
