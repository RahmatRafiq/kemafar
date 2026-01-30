'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminTable } from '@/shared/hooks/useAdminTable';
import { useAuth } from '@/lib/auth/AuthContext';
import { Edit, Trash2 } from 'lucide-react';
import { Modal } from '@/shared/components/ui/Modal';
import Link from 'next/link';
import { AdminDataTable } from '@/shared/components/datatables/AdminDataTable';
import { ITEMS_PER_PAGE } from '@/lib/constants/admin';

interface TimelineListItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
}

export default function TimelinePage() {
  const router = useRouter();
  const { hasPermission, loading: authLoading } = useAuth();

  // Confirmation Modal State
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
    variant: 'danger' | 'primary';
    isLoading: boolean;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: async () => { },
    variant: 'primary',
    isLoading: false,
  });

  const closeConfirm = () => setConfirmState(prev => ({ ...prev, isOpen: false }));

  // Check permissions
  useEffect(() => {
    if (authLoading) return;
    if (!hasPermission(['super_admin', 'admin'])) {
      router.push('/admin/dashboard');
    }
  }, [authLoading, hasPermission, router]);

  // Memoize searchColumns to prevent infinite re-renders
  const searchColumns = useMemo(() => ['title', 'description'], []);

  // Fetch timeline data with hook
  const {
    items: timelineItems,
    loading,
    totalCount,
    currentPage,
    setCurrentPage,
    totalPages,
    searchQuery,
    setSearchQuery,
    deleteItem,
  } = useAdminTable<TimelineListItem>({
    tableName: 'organization_timeline',
    selectColumns: 'id, year, title, description, order_index, created_at',
    sortColumn: 'year',
    sortAscending: false,
    itemsPerPage: ITEMS_PER_PAGE,
    filterByAuthor: false, // Timeline is not author-specific
    searchColumns,
  });

  const handleDelete = useCallback((id: string, title: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Timeline Item',
      description: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      variant: 'danger',
      isLoading: false,
      onConfirm: async () => await deleteItem(id),
    });
  }, [deleteItem]);

  // Handle actual confirmation click
  const onConfirmClick = async () => {
    setConfirmState(prev => ({ ...prev, isLoading: true }));
    await confirmState.onConfirm();
    setConfirmState(prev => ({ ...prev, isOpen: false, isLoading: false }));
  };

  // Table Configuration
  const tableConfig = useMemo(() => ({
    tableName: 'organization_timeline',
    columns: [
      {
        data: 'year',
        title: 'Year',
        sortable: true,
        responsivePriority: 1,
        className: 'font-medium text-gray-900',
      },
      {
        data: 'title',
        title: 'Title',
        sortable: true,
        responsivePriority: 2,
        className: 'text-gray-900',
      },
      {
        data: 'description',
        title: 'Description',
        sortable: false,
        render: (val: unknown) => {
          const text = String(val);
          const truncated = text.length > 100 ? text.substring(0, 100) + '...' : text;
          return <span className="text-gray-700 text-sm">{truncated}</span>;
        },
      },
      {
        data: 'order_index',
        title: 'Order',
        sortable: true,
        render: (val: unknown) => String(val),
      },
      {
        data: 'id', // Using ID for actions column
        title: 'Actions',
        sortable: false,
        className: 'text-right',
        render: (id: unknown, _: string, row: Record<string, unknown>) => (
          <div className="flex items-center justify-end gap-2">
            <Link
              href={`/admin/timeline/${id}`}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => handleDelete(id as string, row.title as string)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      },
    ],
    pageLength: ITEMS_PER_PAGE,
    search: {
      placeholder: 'Search by title or description...',
    },
  }), [handleDelete]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminDataTable
        config={tableConfig}
        data={timelineItems}
        createButton={{
          label: 'Add Timeline Item',
          href: '/admin/timeline/new',
        }}
        header={{
          title: 'Organization Timeline',
          description: 'Manage timeline and history items for the About page',
        }}
        isLoading={loading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        manualPagination={{
          currentPage,
          pageCount: totalPages,
          totalRecords: totalCount,
          onPageChange: setCurrentPage,
        }}
      />

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmState.isOpen}
        onClose={closeConfirm}
        title={confirmState.title}
      >
        <div className="space-y-4">
          <p className="text-gray-600">{confirmState.description}</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeConfirm}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={confirmState.isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirmClick}
              disabled={confirmState.isLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                ${confirmState.variant === 'danger'
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                }`}
            >
              {confirmState.isLoading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
