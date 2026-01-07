import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  Loader2,
} from 'lucide-react';
import { communicationsQueries } from '~/lib/communications/queries';
import { sendMessage } from '~/server/function/communications';

export const Route = createFileRoute('/(admin)/admin/communications')({
  component: AdminCommunications,
});

type RecipientType = 'all' | 'team' | 'season' | 'individual';
type MessageType = 'email' | 'sms';

function AdminCommunications() {
  const queryClient = useQueryClient();

  const { data: templates = [], isLoading: templatesLoading } = useQuery(
    communicationsQueries.activeTemplates()
  );
  const { data: messageLogs = [], isLoading: logsLoading } = useQuery(communicationsQueries.logs());
  const { data: teams = [] } = useQuery(communicationsQueries.teams());
  const { data: seasons = [] } = useQuery(communicationsQueries.seasons());
  const { data: stats } = useQuery(communicationsQueries.stats());

  const [messageType, setMessageType] = useState<MessageType>('email');
  const [recipientType, setRecipientType] = useState<RecipientType>('all');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const sendMutation = useMutation({
    mutationFn: async () => {
      return await sendMessage({
        data: {
          type: messageType,
          subject: messageType === 'email' ? subject : undefined,
          body: message,
          recipientType,
          teamId: recipientType === 'team' ? selectedTeam : undefined,
          seasonId: recipientType === 'season' ? selectedSeason : undefined,
          recipientEmail: recipientType === 'individual' && messageType === 'email' ? recipientEmail : undefined,
          recipientPhone: recipientType === 'individual' && messageType === 'sms' ? recipientPhone : undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      // Reset form
      setSubject('');
      setMessage('');
      setSelectedTemplate('');
      alert('Message sent successfully!');
    },
    onError: (error) => {
      alert(`Failed to send message: ${error.message}`);
    },
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setSubject(template.subject);
      setMessage(template.body);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMutation.mutate();
  };

  const isLoading = templatesLoading || logsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

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
              <CardDescription>Send email or SMS to parents, teams, or seasons</CardDescription>
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
                      variant={recipientType === 'season' ? 'default' : 'outline'}
                      onClick={() => setRecipientType('season')}
                      className="justify-start"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Season
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

                {/* Team Selection */}
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

                {/* Season Selection */}
                {recipientType === 'season' && (
                  <div className="space-y-2">
                    <Label htmlFor="season">Select Season</Label>
                    <select
                      id="season"
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Choose a season...</option>
                      {seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                          {season.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Individual Recipient */}
                {recipientType === 'individual' && (
                  <div className="space-y-2">
                    <Label htmlFor="recipient">
                      {messageType === 'email' ? 'Recipient Email' : 'Recipient Phone'}
                    </Label>
                    {messageType === 'email' ? (
                      <Input
                        id="recipient"
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="email@example.com"
                        required
                      />
                    ) : (
                      <Input
                        id="recipient"
                        type="tel"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    )}
                  </div>
                )}

                {/* Template Selection */}
                {templates.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="template">Use Template (Optional)</Label>
                    <select
                      id="template"
                      value={selectedTemplate}
                      onChange={(e) => handleTemplateSelect(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select a template...</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                    Use these in your message: {'{{team}}'}, {'{{date}}'}, {'{{time}}'}, {'{{location}}'},
                    {'{{playerName}}'}, {'{{reason}}'}
                  </p>
                </div>

                {/* Send Button */}
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" disabled>
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button type="submit" disabled={sendMutation.isPending}>
                    {sendMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
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
                <span className="font-semibold">{stats?.emailsSentThisMonth ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">SMS Sent (This Month)</span>
                </div>
                <span className="font-semibold">{stats?.smsSentThisMonth ?? 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Total Recipients</span>
                </div>
                <span className="font-semibold">{stats?.totalRecipientsThisMonth ?? 0}</span>
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
              {templates.length > 0 ? (
                <div className="space-y-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className="w-full text-left rounded-lg border p-3 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{template.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{template.body}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No templates available</p>
              )}
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
          {messageLogs.length > 0 ? (
            <div className="divide-y">
              {messageLogs.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-full p-2 ${msg.type === 'email' ? 'bg-blue-100' : 'bg-green-100'}`}
                    >
                      {msg.type === 'email' ? (
                        <Mail className="h-4 w-4 text-blue-600" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{msg.subject || 'SMS Message'}</h4>
                      <p className="text-sm text-muted-foreground">
                        To: {msg.recipientType === 'all' ? 'All Parents' : msg.recipientType} (
                        {msg.recipientCount} recipients)
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <History className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
              No messages sent yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
