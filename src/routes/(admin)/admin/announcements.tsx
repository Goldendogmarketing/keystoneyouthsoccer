import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Plus,
  Megaphone,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { announcementsQueries } from '~/lib/announcements/queries';
import {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementActive,
} from '~/server/function/announcements';

export const Route = createFileRoute('/(admin)/admin/announcements')({
  component: AdminAnnouncements,
});

type AnnouncementType = 'info' | 'warning' | 'success' | 'urgent';

interface FormData {
  title: string;
  message: string;
  type: AnnouncementType;
  linkUrl: string;
  linkText: string;
  startDate: string;
  endDate: string;
}

const initialFormData: FormData = {
  title: '',
  message: '',
  type: 'info',
  linkUrl: '',
  linkText: '',
  startDate: '',
  endDate: '',
};

const typeConfig: Record<AnnouncementType, { icon: React.ElementType; color: string; bgColor: string; label: string }> = {
  info: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Info' },
  warning: { icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-100', label: 'Warning' },
  success: { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Success' },
  urgent: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Urgent' },
};

function AdminAnnouncements() {
  const queryClient = useQueryClient();
  const { data: announcements = [], isLoading } = useQuery(announcementsQueries.all());

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await createAnnouncement({
        data: {
          title: data.title,
          message: data.message,
          type: data.type,
          linkUrl: data.linkUrl || undefined,
          linkText: data.linkText || undefined,
          startDate: data.startDate || undefined,
          endDate: data.endDate || undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      return await updateAnnouncement({
        data: {
          id,
          title: data.title,
          message: data.message,
          type: data.type,
          linkUrl: data.linkUrl || undefined,
          linkText: data.linkText || undefined,
          startDate: data.startDate || undefined,
          endDate: data.endDate || undefined,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteAnnouncement({ data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      return await toggleAnnouncementActive({ data: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleEdit = (announcement: typeof announcements[0]) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      message: announcement.message,
      type: announcement.type as AnnouncementType,
      linkUrl: announcement.linkUrl || '',
      linkText: announcement.linkText || '',
      startDate: announcement.startDate ? new Date(announcement.startDate).toISOString().split('T')[0] : '',
      endDate: announcement.endDate ? new Date(announcement.endDate).toISOString().split('T')[0] : '',
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const activeAnnouncements = announcements.filter((a) => a.isActive);
  const inactiveAnnouncements = announcements.filter((a) => !a.isActive);
  const isPending = createMutation.isPending || updateMutation.isPending;

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
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Manage landing page announcements and alerts</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setFormData(initialFormData); }}>
          <Plus className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Announcement' : 'Create Announcement'}</CardTitle>
            <CardDescription>
              Announcements appear as banners on the website homepage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Announcement title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as AnnouncementType })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {Object.entries(typeConfig).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Announcement message"
                  rows={3}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="linkUrl">Link URL (optional)</Label>
                  <Input
                    id="linkUrl"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    placeholder="/register or https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkText">Link Text (optional)</Label>
                  <Input
                    id="linkText"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    placeholder="Learn More"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date (optional)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Preview */}
              {formData.title && formData.message && (
                <div className="rounded-lg border p-4">
                  <Label className="text-sm text-muted-foreground">Preview</Label>
                  <div className={`mt-2 rounded-lg p-4 ${typeConfig[formData.type].bgColor}`}>
                    <div className="flex items-start gap-3">
                      {(() => {
                        const Icon = typeConfig[formData.type].icon;
                        return <Icon className={`h-5 w-5 ${typeConfig[formData.type].color}`} />;
                      })()}
                      <div>
                        <p className="font-semibold">{formData.title}</p>
                        <p className="text-sm mt-1">{formData.message}</p>
                        {formData.linkUrl && formData.linkText && (
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-2">
                            {formData.linkText}
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={resetForm} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingId ? 'Save Changes' : 'Create Announcement'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Active Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-600" />
            Active Announcements ({activeAnnouncements.length})
          </CardTitle>
          <CardDescription>Currently visible on the website</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {activeAnnouncements.map((announcement) => {
                const config = typeConfig[announcement.type as AnnouncementType];
                const Icon = config.icon;
                return (
                  <div
                    key={announcement.id}
                    className="flex items-start justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2 ${config.bgColor}`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{announcement.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Type: {config.label}</span>
                          {announcement.startDate && (
                            <span>From: {new Date(announcement.startDate).toLocaleDateString()}</span>
                          )}
                          {announcement.endDate && (
                            <span>Until: {new Date(announcement.endDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(announcement)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleMutation.mutate(announcement.id)}
                        disabled={toggleMutation.isPending}
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(announcement.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-muted-foreground">No active announcements</p>
              <Button variant="outline" className="mt-4" onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Announcement
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inactive Announcements */}
      {inactiveAnnouncements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-muted-foreground" />
              Inactive Announcements ({inactiveAnnouncements.length})
            </CardTitle>
            <CardDescription>Hidden from the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inactiveAnnouncements.map((announcement) => {
                const config = typeConfig[announcement.type as AnnouncementType];
                const Icon = config.icon;
                return (
                  <div
                    key={announcement.id}
                    className="flex items-start justify-between rounded-lg border border-dashed p-4 opacity-60"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-2 ${config.bgColor}`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{announcement.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(announcement)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleMutation.mutate(announcement.id)}
                        disabled={toggleMutation.isPending}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(announcement.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
